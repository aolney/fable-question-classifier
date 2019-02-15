module App.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser
open Fable.Helpers.React
open Fable.Helpers.React.Props

open Elmish.React
open Elmish.Debug
open Elmish.HMR
open Elmish
open System.IO

open Fulma

//open Elmish.Browser.Navigation
//open Elmish.Browser.UrlParser

importAll "../sass/main.sass"

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

type Model = 
  {
    Input : string
    Output : string
    Mode : Mode
  }

type Msg =
    | ProcessInput
    | ModeChange of Mode
    | UpdateInput of string

let init () : Model * Cmd<Msg> =
  //
  //Natural.localStorageTest ()
  //Natural.configureBrowserFS ()
  //({Input="A little blue-and-black fish swims up to a mirror. It maneuvers its body vertically to reflect its belly, along with a brown mark that researchers have placed on its throat."; Output=""}, [])
  ({Mode=Mode.FreeText; Input="Whom did you ask? Did you ever have a reason to think that the sandwhich which you compared to a lemming might know how to test or assess the characteristic frequency of an unladen swallow? Shouldn't you guess? Don't you think you haven't? Won't you at least try? What was its name? Why do you think that?"; Output=""}, [])

// Update
// ---------------------------------------
let update msg model =
  match msg with
  | ModeChange( newMode ) -> 
    ({ model with Mode = newMode}, [])
  | UpdateInput(input) ->
      ({ model with Input = input}, [])
  | ProcessInput ->
      let TokenizeTagClassify (text:string) =
        text +  " " //pad with white space b/c of bug
        |> sentenceTokenizer.tokenize
        |> Array.map( fun s -> 
          let taggedSentence = s |> wordTokenizer.tokenize |> tagger.tag 
          let flatTaggedSentence = taggedSentence.taggedWords |> Array.map( fun tw -> tw.token + "/" + tw.tag ) |> String.concat " "
          let questionClassification,matches = flatTaggedSentence |> QuestionClassifier.Classify QuestionClassifier.ClassificationMode.Monothetic  QuestionClassifier.IndirectQuestionMode.Relaxed
          (questionClassification, matches)
        )

      let TokenizeTag (text:string) = 
        text +  " " //pad with white space b/c of bug
        |> sentenceTokenizer.tokenize
        |> Array.map( fun s -> 
          let taggedSentence = s |> wordTokenizer.tokenize |> tagger.tag 
          let flatTaggedSentence = taggedSentence.taggedWords |> Array.map( fun tw -> tw.token + "/" + tw.tag ) |> String.concat " "
          flatTaggedSentence
        )

      let TabbedInput (text:string) =
        let rowCols =
            model.Input.Split('\n')
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
        | FreeText -> model.Input |> TokenizeTagClassify |> toJson
        | TagOnly -> model.Input |> TokenizeTag |> toJson
        | TabDelimited -> model.Input |> TabbedInput |> toJson
        
      ({model with Output=output}, [])

// View
// ---------------------------------------
let simpleButton txt action dispatch =
  div
    [ ClassName "column is-narrow" ]
    [ a
        [ ClassName "button"
          OnClick (fun _ -> action |> dispatch) ]
    [ str txt ] ]

let view model dispatch =
  div [ ClassName "columns is-vcentered" ] [ 
    div [ ClassName "column" ] [ 
      h1 [ ClassName "title"] [ str "Question Classifier"]
      //https://github.com/fable-compiler/repl/blob/master/public/samples/fulma/dropdown.fs
      Field.div [ ]
                [ Label.label [ ]
                    [ str "Mode" ]
                  Control.div [ ]
                     [ Select.select [ Select.Props [ OnClick (fun ev  -> ModeChange(!!ev.target?value) |> dispatch) ] ]
                        [ select [ DefaultValue model.Mode ]
                            [ option [ Value Mode.FreeText ] [ str "Free text" ]
                              option [ Value Mode.TabDelimited ] [ str "Tab delimited" ]
                              option [ Value Mode.TagOnly ] [ str "Tag only" ] ] ] ] ]
      div [ ClassName "content"] [
        p [] [ str "Enter your text here. In Free text mode, sentences will be tokenized using simple punctuation and individually classified. In Tab delimited mode, it will be treated as tab delimited with the last column as text input." ]
        textarea [
                    ClassName "input"
                    DefaultValue model.Input
                    Size 100000.0
                    Style [
                        Width "100%"
                        Height "600px"
                    ] 
                    OnInput (fun ev ->  UpdateInput (!!ev.target?value) |> dispatch )
                ] []
        simpleButton "Go" ProcessInput dispatch
        p [] [ str "Your results appear here." ]
        str model.Output 
      ]    
    ]
  ]  


// App
Program.mkProgram init update view
//|> Program.toNavigable (parseHash pageParser) urlUpdate
#if DEBUG
|> Program.withDebugger
//|> Program.withHMR
#endif
|> Program.withReact "elmish-app"
|> Program.run
