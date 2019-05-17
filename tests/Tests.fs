module Tests

open Fable.Core
// open Fable.Core.JsInterop
// open Fable.Core.JS
open App
open Node

let inline equal (expected: 'T) (actual: 'T): unit =
    Testing.Assert.AreEqual(expected, actual)

let [<Global>] describe (name: string) (f: unit->unit) = jsNative
let [<Global>] it (msg: string) (f: unit->unit) = jsNative

let writeFile (path: string) (content: string) =
  fs.writeFileSync(path, content)

let readFile (path: string) =
  fs.readFileSync(path, "utf8")

// describe "my tests" <| fun _ ->
//     it "calls App.randomFeature() successfully" <| fun () ->
//       randomFeature() |> Seq.sum = 6 |> equal true

describe "Tests" <| fun _ ->
    it "Classifier accuracy" <| fun () ->
      let filePath = path.resolve([|"tests";"labelled-data.tsv"|])
      let caseTuples = 
        (readFile filePath).Split('\n')
        |> Array.map( fun row ->
          let s = row.Split('\t')
          s.[0],s.[1]
        )
      let classificationTuples = 
        caseTuples
        |> Array.map( fun (correctClass,question) ->
          correctClass,(question |> App.TokenizeTagClassify).[0] |> fst ) //we know that there is only one question per line

      let NumberCorrect (tuples)= 
        tuples
        |> Array.sumBy( fun (gold,hypothesis) -> if gold = hypothesis then 1.0 else 0.0 )

      printfn "Overall accuracy is %f" ( ( classificationTuples|> NumberCorrect) /( classificationTuples.Length |> float) )

      printfn "Per category accuracy is"
      for classification,cTuples in classificationTuples |> Array.groupBy fst do
        printfn "%s accuracy is %f" classification ( ( cTuples|> NumberCorrect) /( cTuples.Length |> float) )
      ()
      //writeFile "test.txt" "hi there"