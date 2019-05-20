module App

open Fable.Core
open Fable.Core.JsInterop
// open Fable.Import
// open Fable.Import.Browser
open Elmish
open Elmish.React
open Fable.React
open Fable.React.Props
open Browser.Dom
open Elmish.Debug
open Elmish.HMR

open Thoth.Json
// open System.IO

open Fulma
open Fable.FontAwesome
open Fable.FontAwesome.Free

//open Elmish.Browser.Navigation
//open Elmish.Browser.UrlParser

// importAll "../sass/main.sass"

//Fable 2 transition
let inline toJson x = Encode.Auto.toString(0, x)
let inline ofJson<'T> json = Decode.Auto.unsafeFromString<'T>(json)

// TESTS
let randomFeature() = [1;2;3]

// Static resources
// ---------------------------------------
//These tokenizers are rule-based not statistical
//NOTE: the original code appears to have used something very close to wordTokenizer, not the TreebankWordTokenizer, even though it used Brill
let sentenceTokenizer = Natural.exports.SentenceTokenizer.Create()
let wordTokenizer = Natural.exports.WordPunctTokenizer.Create()
// let lexicon = Natural.exports.Lexicon.Create( Natural.lexiconPath, "N")
// let rules = Natural.exports.RuleSet.Create( Natural.rulePath)
let lexicon = Natural.exports.Lexicon.Create( "EN", "N")
let rules = Natural.exports.RuleSet.Create( "EN" )
let tagger = Natural.exports.BrillPOSTagger.Create( lexicon, rules )


// Domain
// ---------------------------------------
type Mode =
    | FreeText 
    | TagOnly 
    | TabDelimited

type Result =
  {
    Input : string
    Output : string
  }

type Model = 
  {
    InputText : string
    Results : Result[]
    Mode : Mode
  }

type Msg =
    | ProcessInput
    | ModeChange of string //Mode
    | UpdateInput of string

let init () : Model * Cmd<Msg> =
  //
  //Natural.localStorageTest ()
  //Natural.configureBrowserFS ()
  //({Input="A little blue-and-black fish swims up to a mirror. It maneuvers its body vertically to reflect its belly, along with a brown mark that researchers have placed on its throat."; Output=""}, [])
  ({Mode=Mode.FreeText; InputText="Whom did you ask? Did you ever have a reason to think that the sandwhich which you compared to a lemming might know how to test or assess the characteristic frequency of an unladen swallow? Shouldn't you guess? Don't you think you haven't? Won't you at least try? What was its name? Why do you think that?"; Results=[|{Input="";Output=""}|]}, [])

// Classifier functions
/// Tokenize and tag but do not classify
let TokenizeTag (text:string) = 
  text +  " " //pad with white space b/c of bug
  |> sentenceTokenizer.tokenize
  |> Array.map( fun sentence -> 
    let taggedSentence = sentence |> wordTokenizer.tokenize |> tagger.tag 
    let flatTaggedSentence = taggedSentence.taggedWords |> Array.map( fun tw -> tw.token + "/" + tw.tag ) |> String.concat " "
    (sentence,flatTaggedSentence)
  )
/// Classification full pipeline
let TokenizeTagClassify ( classificationMode: QuestionClassifier.ClassificationMode ) ( indirectQuestionMode: QuestionClassifier.IndirectQuestionMode )(text:string) =
  text
  |> TokenizeTag
  |> Array.map( fun (sentence, flatTaggedSentence)->
    let questionClassification,matches = flatTaggedSentence |> QuestionClassifier.Classify classificationMode indirectQuestionMode
    (sentence, questionClassification, matches)
  )

// Update
// ---------------------------------------
let update msg model =
  match msg with
  | ModeChange( modeString ) -> 
    //seems like we shouldn't have to do this, but fable is not sending us modes as the value from the picker (TODO: file bug report)
    let newMode = 
      match modeString with
      | "TagOnly" -> Mode.TagOnly
      | "TabDelimited" -> Mode.TabDelimited
      | _ -> Mode.FreeText
    ({ model with Mode = newMode}, [])
  | UpdateInput(input) ->
      ({ model with InputText = input}, [])
  | ProcessInput ->

      let TabbedInput (text:string) =
        let rowCols =
            model.InputText.Split('\n')
            |> Array.map( fun row ->
              row.Split('\t')
            )
        let inputRows = 
          rowCols
          |> Seq.map( fun a -> a |> Array.last)
        //
        inputRows 

      let output = 
        match model.Mode with
        | FreeText ->  
          model.InputText 
          |> TokenizeTagClassify QuestionClassifier.ClassificationMode.Monothetic QuestionClassifier.IndirectQuestionMode.IsOff 
          |> Array.map( fun (sentence,classification,matches)-> { Input=sentence; Output= classification})
          //|> toJson
        | TagOnly -> 
          model.InputText 
          |> TokenizeTag 
          |> Array.map( fun (sentence,flatTaggedSentence)-> { Input=sentence; Output= flatTaggedSentence})
          //|> toJson
        //TODO
        | TabDelimited -> [|{Input="";Output=""}|] //model.InputText |> TabbedInput |> toJson
        
      ({model with Results=output}, [])

// View
// ---------------------------------------
let simpleButton txt action dispatch =
  div 
    [ ClassName "column is-narrow" ]
    [ a
        [ ClassName "button"
          OnClick (fun _ -> action |> dispatch) ]
    [ str txt ] ]

let createHead ( model ) =
    let headers = 
      match model.Mode with
      | FreeText -> ["Sentence"; "Classification"]
      | TagOnly -> ["Sentence"; "Tagged Sentence"]
      | TabDelimited -> ["TODO"; "TODO"]
    thead [] [
        tr [] [for header in headers do
                yield th [] [str header]]
    ]

let view model dispatch =
  div [ ClassName "columns is-vcentered" ] [ 
    div [ ClassName "column" ] [ 
      h1 [ ClassName "title"] [ str "Question Classifier"]
      //https://github.com/fable-compiler/repl/blob/master/public/samples/fulma/dropdown.fs
      //https://github.com/MangelMaxime/fulma-demo/blob/master/src/App.fsDropdown.dropdown [ Dropdown.IsHoverable ]
        // [ div [ ]
        //     [ Button.button [ ]
        //         [ span [ ]
        //             [ str "Mode" ]
        //           Icon.icon [ Icon.Size IsSmall ]
        //             [ Fa.i [ Fa.Solid.AngleDown ]
        //                 [ ] ] ] ]
        //   Dropdown.menu [ ]
        //     [ Dropdown.content [ ]
        //         [ Dropdown.Item.a [ Dropdown.Item.IsActive true ]
        //             [ str "Free text" ]
        //           Dropdown.Item.a [ ]
        //             [ str "Tab delimited" ]
        //           Dropdown.Item.a [  ]
        //             [ str "Tag only" ]
        // ] ] ]
      Field.div [ ]
                [ Label.label [ ]
                    [ str "Mode" ]
                  Control.div [ ]
                     [ Select.select [  ]
                        [ select [ DefaultValue model.Mode ; OnChange (fun ev  -> ModeChange( ev.Value ) |> dispatch) ]
                            [ option [ Value Mode.FreeText ] [ str "Free text" ]
                              option [ Value Mode.TabDelimited ] [ str "Tab delimited" ]
                              option [ Value Mode.TagOnly ] [ str "Tag only" ] ] ] ] ]
      div [ ClassName "content"] [
        p [] [ str "Enter your text here. In Free text mode, sentences will be tokenized using simple punctuation and individually classified. In Tab delimited mode, it will be treated as tab delimited with the last column as text input. Your results will appear below the 'Go' button and can be copy/pasted to spreadsheet software." ]
        textarea [
                    ClassName "input"
                    DefaultValue model.InputText
                    Size 100000.0
                    Style [
                        Width "100%"
                        Height "200px"
                    ] 
                    OnInput (fun ev ->  UpdateInput (!!ev.target?value) |> dispatch )
                ] []
        simpleButton "Go" ProcessInput dispatch
        hr []
        br []
        Table.table [ Table.IsStriped ] [
            createHead( model )
            tbody [] [
                for result in model.Results do
                    yield tr [] [
                        td [] [str result.Input]
                        td [] [str result.Output]
                    ]
                  ]
              ]
        //model.Results https://github.com/fable-compiler/static-web-generator/blob/master/src/Main.fs
      ]    
    ]
  ]  

//test shim
// let NothingCallback (f:float) = ()
// let NothingRequest (callback: float -> unit) = 1.0
// window.requestAnimationFrame <- NothingRequest

// App
Program.mkProgram init update view
//|> Program.toNavigable (parseHash pageParser) urlUpdate
#if DEBUG
|> Program.withDebugger
//|> Program.withHMR
#endif
|> Program.withReactBatched "elmish-app" //?withReactSynchronous?
|> Program.run
