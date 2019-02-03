module Natural

//Foreign interface file for https://github.com/NaturalNode/natural
open Fable.Core
open Fable.Core.JsInterop
open Fable.PowerPack
open Fable.PowerPack.Fetch

let inline private (~%) x = createObj x

let inline private (=>) x y = x ==> y

//let basePath = "/z/aolney/repos/FableSpeechActClassifier/node_modules/natural/lib/natural/brill_pos_tagger/data/English/"
// let rulePath = "tr_from_posjs.txt";
// let lexiconPath = "lexicon_from_posjs.json";

// let configureBrowserFS : unit -> unit = import "configureBrowserFS" "../public/browserfs.config.js"
// let listFiles : unit -> unit = import "listFiles" "../public/browserfs.config.js"
// let localStorageTest : unit -> unit = import "localStorageTest" "../public/browserfs.config.js"


//SentenceTokenizer
type [<AllowNullLiteral>] SentenceTokenizer =
    /// Warning: this tokenizer appears to be pretty stupid (model-free)
    abstract tokenize : string -> string []
and [<AllowNullLiteral>] SentenceTokenizerStatic =
    [<Emit("new $0($1...)")>] abstract Create: unit -> SentenceTokenizer
//TODO: I would like to use a call like this; at one point it was working. Using IExports as a workaround
//let [<Import("SentenceTokenizer",from="natural")>] SentenceTokenizer : SentenceTokenizerStatic = jsNative

//WordTokenizer
type [<AllowNullLiteral>] WordTokenizer =
    /// Warning: this tokenizer appears to be pretty stupid (model-free)
    abstract tokenize : string -> string []
and [<AllowNullLiteral>] WordTokenizerStatic =
    [<Emit("new $0($1...)")>] abstract Create: unit -> WordTokenizer

//Lexicon
type [<AllowNullLiteral>] Lexicon = class end
and [<AllowNullLiteral>] LexiconStatic =
    [<Emit("new $0($1...)")>] abstract Create: string*string -> Lexicon

//Lexicon
type [<AllowNullLiteral>] RuleSet = class end
and [<AllowNullLiteral>] RuleSetStatic =
    [<Emit("new $0($1...)")>] abstract Create: string -> RuleSet

//BrillPOSTagger
type [<AllowNullLiteral>] BrillPOSTagger =
    abstract tag : string [] -> string []
and [<AllowNullLiteral>] BrillPOSTaggerStatic =
    [<Emit("new $0($1...)")>] abstract Create: Lexicon * RuleSet -> BrillPOSTagger


//Define exports
type [<AllowNullLiteral>] IExports =
    abstract SentenceTokenizer: SentenceTokenizerStatic
    abstract WordTokenizer : WordTokenizerStatic
    abstract BrillPOSTagger: BrillPOSTaggerStatic
    abstract Lexicon: LexiconStatic
    abstract RuleSet: RuleSetStatic

//Link to JS
[<Import("*",from="natural")>]
let exports : IExports = jsNative