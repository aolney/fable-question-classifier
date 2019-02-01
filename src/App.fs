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

// Domain
// ---------------------------------------
type Model = 
  {
    Input : string
    Output : string
  }

type Msg =
  | ProcessInput

let init () : Model * Cmd<Msg> =
  //Natural.localStorageTest ()
  //Natural.configureBrowserFS ()
  {Input="A little blue-and-black fish swims up to a mirror. It maneuvers its body vertically to reflect its belly, along with a brown mark that researchers have placed on its throat."; Output=""}, []

// Update
// ---------------------------------------
let update msg model =
  match msg with
  | ProcessInput ->
      //Recover sentences
      let sentenceTokenizer = Natural.exports.SentenceTokenizer.Create()
      let wordTokenizer = Natural.exports.WordTokenizer.Create()
      // let lexicon = Natural.exports.Lexicon.Create( Natural.lexiconPath, "N")
      // let rules = Natural.exports.RuleSet.Create( Natural.rulePath)
      let lexicon = Natural.exports.Lexicon.Create( "EN", "N")
      let rules = Natural.exports.RuleSet.Create( "EN" )
      let tagger = Natural.exports.BrillPOSTagger.Create( lexicon, rules )

      let taggedSentences =
        model.Input + " " //pad with white space b/c of bug
        |> sentenceTokenizer.tokenize
        |> Array.map( fun sentence ->
          sentence
          |> wordTokenizer.tokenize
          |> tagger.tag
        )

      {model with Output=(taggedSentences |> toJson )}, []

// View
// ---------------------------------------
let simpleButton txt action dispatch =
  div
    [ ClassName "column is-narrow" ]
    [ a
        [ ClassName "button"
          OnClick (fun _ -> action |> dispatch) ]
    [ str txt ] ]

let root model dispatch =
  div
      [ ClassName "columns is-vcentered" ]
      [ div [ ClassName "column" ] [ ]
        simpleButton "Go" ProcessInput dispatch
        div [ ClassName "column" ] [ str model.Output ] ]  


// App
Program.mkProgram init update root
//|> Program.toNavigable (parseHash pageParser) urlUpdate
#if DEBUG
|> Program.withDebugger
//|> Program.withHMR
#endif
|> Program.withReact "elmish-app"
|> Program.run
