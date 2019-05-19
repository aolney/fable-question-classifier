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

type LabeledDataRow =
  {
    HumanLabel : string
    Text : string
    BrillTagged : string
    OriginalishLabel : string
  }
  static member Create a b c d =
        { HumanLabel=a; Text=b; BrillTagged=c; OriginalishLabel=d}

describe "Tests" <| fun _ ->
    it "Classifier accuracy" <| fun () ->

      let NumberCorrect (goldHypothesisTuples)= 
        goldHypothesisTuples
        |> Array.sumBy( fun (gold,hypothesis) -> if gold = hypothesis then 1.0 else 0.0 )

      let PrintResults ( goldHypothesisTuples ) =
        printfn "Overall accuracy is %f" ( ( goldHypothesisTuples |> NumberCorrect) /( goldHypothesisTuples.Length |> float) )

        printfn "Per category accuracy is"
        for classification,cTuples in goldHypothesisTuples |> Array.groupBy fst do
          printfn "%s accuracy is %f" classification ( ( cTuples |> NumberCorrect) /( cTuples.Length |> float) )

      //Get labeled data
      let filePath = path.resolve([|"tests";"labelled-data.tsv"|])
      let labeledRows = 
        (readFile filePath).Split('\n')
        |> Array.skip 1 //skip header
        |> Array.map( fun row ->
          let s = row.Split('\t')
          LabeledDataRow.Create s.[0] s.[1] s.[2] s.[3]
        )

      //Run the classifier on labeled data
      let classificationTuples = 
        labeledRows
        |> Array.map( fun row ->
          row,(row.Text |> App.TokenizeTagClassify).[0] |> fst ) //we know that there is only one question per line

      //Print current classification results vs human
      printfn "CURRENT VS HUMAN"
      classificationTuples |> Array.map( fun (row,hypothesis) -> row.HumanLabel,hypothesis ) |> PrintResults 

      //Print originalish classification results vs human
      printfn "ORIGINALISH VS HUMAN"
      classificationTuples |> Array.map( fun (row,_) -> row.HumanLabel,row.OriginalishLabel ) |> PrintResults 

      // printfn "MISSING CLASSIFICATIONS"
      // classificationTuples 
      // |> Array.filter( fun (row,classification) -> row.HumanLabel.Trim() = "" || classification.Trim() = "" )
      // |> Array.iter( fun (row,classification) -> printfn "%s" row.Text )

      ()
      //writeFile "test.txt" "hi there"