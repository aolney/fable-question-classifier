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
type Model = 
  {
    Input : string
    Output : string
  }

type Msg =
  | ProcessInput
  | UpdateInput of string

let init () : Model * Cmd<Msg> =
  //
  //Natural.localStorageTest ()
  //Natural.configureBrowserFS ()
  //({Input="A little blue-and-black fish swims up to a mirror. It maneuvers its body vertically to reflect its belly, along with a brown mark that researchers have placed on its throat."; Output=""}, [])
  ({Input="Whom did you ask? Did you ever have a reason to think that the sandwhich which you compared to a lemming might know how to test or assess the characteristic frequency of an unladen swallow? Shouldn't you guess? Don't you think you haven't? Won't you at least try? What was its name? Why do you think that?"; Output=""}, [])

// Update
// ---------------------------------------
let update msg model =
  match msg with
  | UpdateInput(input) ->
      ({ model with Input = input}, [])
  | ProcessInput ->
      let TokenizeTagClassify (text:string) =
        text +  " " //pad with white space b/c of bug
        |> sentenceTokenizer.tokenize
        |> Array.map( fun s -> 
          let taggedSentence = s |> wordTokenizer.tokenize |> tagger.tag 
          let flatTaggedSentence = taggedSentence.taggedWords |> Array.map( fun tw -> tw.token + "/" + tw.tag ) |> String.concat " "
          let transformedSetence,matches = flatTaggedSentence |> QuestionClassifier.ApplyCascade
          transformedSetence
        )


      let output =
        //presence of tabs indicates last column is text to process
        if model.Input.Contains("\t") then
          let dummy =
            model.Input.Split('\n')
            |> Array.map( fun row ->
              let s = row.Split('\t')
              let tagged = s.[s.Length-1] |> TokenizeTagClassify

              row + "\t" + (tagged |> toJson)
            )
          dummy |> toJson
        else
          model.Input |> TokenizeTagClassify |> toJson
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
      div [ ClassName "content"] [
        p [] [ str "Enter your text here. Sentences will be tokenized using simple punctuation and individually classified. If input contains tabs it will be treated as tab delimited with the last column as text input." ]
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
