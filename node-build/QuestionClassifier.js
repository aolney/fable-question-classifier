"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Feature$reflection = Feature$reflection;
exports.ApplyCascade = ApplyCascade;
exports.ApplyPatterns = ApplyPatterns;
exports.ForceIndirectQuestion = ForceIndirectQuestion;
exports.IndirectQuestionMode$reflection = IndirectQuestionMode$reflection;
exports.ClassificationMode$reflection = ClassificationMode$reflection;
exports.Classify = Classify;
exports.ClassificationMode = exports.IndirectQuestionMode = exports.doHaveRegex = exports.whRegex = exports.questionRegex = exports.casscade = exports.patterns = exports.features = exports.Feature = void 0;

var _Types = require("./fable-library.2.3.8/Types");

var _Reflection = require("./fable-library.2.3.8/Reflection");

var _List = require("./fable-library.2.3.8/List");

var _RegExp = require("./fable-library.2.3.8/RegExp");

var _Seq = require("./fable-library.2.3.8/Seq");

var _Array = require("./fable-library.2.3.8/Array");

var _Util = require("./fable-library.2.3.8/Util");

var _String = require("./fable-library.2.3.8/String");

var _Map = require("./fable-library.2.3.8/Map");

const Feature = (0, _Types.declare)(function QuestionClassifier_Feature(arg1, arg2, arg3) {
  this.Name = arg1;
  this.Pattern = arg2;
  this.Replace = arg3;
}, _Types.Record);
exports.Feature = Feature;

function Feature$reflection() {
  return (0, _Reflection.record)("QuestionClassifier.Feature", [], Feature, () => [["Name", _Reflection.string], ["Pattern", _Reflection.string], ["Replace", _Reflection.bool]]);
}

const features = (0, _List.ofArray)([new Feature("WHAT", "\\b[Ww]hat/[A-Z]+", true), new Feature("HOW", "\\b[Hh]ow/[A-Z]+", true), new Feature("WHO_", "\\b([Ww]ho|[Ww]hose|[Ww]hom)/[A-Z]+", true), new Feature("WHERE", "\\b[Ww]here/[A-Z]+", true), new Feature("WHEN", "\\b[Ww]hen/[A-Z]+", true), new Feature("WHICH", "\\b[Ww]hich/[A-Z]+", true), new Feature("WHY", "\\b[Ww]hy/[A-Z]+", true), new Feature("WOULD", "\\b[Ww]ould/[A-Z]+", true), new Feature("NEG", "\\b([Nn]ever|[Nn]ot|[Nn]or|[Nn]either|n't|'t|t)/[A-Z]+", true), new Feature("YOU", "\\b[Yy]ou/[A-Z]+", true), new Feature("YOUR", "\\b[Yy]our/[A-Z]+", true), new Feature("SHOULD", "\\b[Yy]our/[A-Z]+", true), new Feature("TELL", "\\b[Tt]ell/[A-Z]+", true), new Feature("@FROM", "\\b[Ff]rom/[A-Z]+", true), new Feature("BETWEEN", "\\b[Bb]etween/[A-Z]+", true), new Feature("@AND", "\\b[Aa]nd/[A-Z]+", true), new Feature("HAPPENCONS HAPPENANTE HAPPENEXPE", "\\b[Hh]appen(s|ed)?/[A-Z]+", true), new Feature("#DISJUNCTION", "\\b[Oo]r/[A-Z]+", true), new Feature("#DEFINITION", "\\b([Dd]efinition|[Mm]eaning|[Dd]efine)/[A-Z]+", true), new Feature("#EXAMPLE", "\\b(example|type|kind|claim|evidence|illustration|instance|support|evidence|prototype|standard|exemplar|picture|case|demonstration|[Ss]how|[Dd]emonstrate|[Ee]xemplify|[Ii]llustrate|[Qq]ualify|typical|model|standard|exemplar)/[A-Z]+", true), new Feature("#QUANTIFICATION", "\\b(amount|number|sum|distance|measurement|length|width|size|height|average|total|approximation)/[A-Z]+", true), new Feature("#FEATURESPEC", "\\b(characteristics?|colors?|parts?|features?|sounds?|propert(y|ies)|attributes?|shapes?|smell(s|ed)?|taste(s|d)?|look(s|ed)?|feels?|felt|sound(s|ed)?|dimension|[Ss]pecify|[Ll]ist|[Dd]escribe|[Cc]haracterize)/[A-Z]+", true), new Feature("#ENABLEMENT", "\\b(tools|useful|helpful|indicated|helps?|need(ed)?|required?|helped|allows?|necessary|have/[A-Z]+ to|in/[A-Z]+ order/[A-Z]+ to)/[A-Z]+", true), new Feature("#CAUSALCONS", "\\b(outcomes?|results?|consequences?|effects?|originates?/[A-Z]+ (in|from)|a?rises?/[A-Z]+ from|springs?/[A-Z]+ from|emanates?/[A-Z]+ from|comes?/[A-Z]+ from|issues?/[A-Z]+ from|flows?/[A-Z]+ from|results?/[A-Z]+ from|depends?/[A-Z]+ (upon|on)|hangs?/[A-Z]+ (upon|on)|hinges?/[A-Z]+ (upon|on)|turns?/[A-Z]+ (upon|on)|conclusion/[A-Z]+ of)/[A-Z]+|HAPPENCONS", true), new Feature("#COMPARISON", "\\b(differences?|similarity?(ies)?|[Dd]istinguish(ed|es)?|[Ss]eparate(d|s)?|[Vv]ar(y|eed|ies)?|[Dd]iscriminate(d|s)?|[Cc]ontrast(ed|s)?|[Dd]iffer(ed|s)?|same|different|similar|like|less|[Rr]elate(d|s)?|[Cc]ompare(d|s)?)/[A-Z]+|[a-z]+/JJR|TELL[^@]*@FROM|BETWEEN[^@]*@AND", true), new Feature("#INSTRUMENTAL", "\\b(plan|scheme|design|proposal|suggestion|arrangement|outline|program|method|way|manner|form|mode|procedure|route|steps|process|used?)/[A-Z]+", true), new Feature("#CAUSALANTE", "\\b(reason|causes?d?|allows?(ed)?|led|lead(s)?|stems?(ed)?|occurs?(ed)?|transpires?(ed)?|made|because|unless)/[A-Z]+|HAPPENANTE", true), new Feature("#GOALORIENTATION", "\\b(motivation|motives?|reasons?|grounds|principles?|intentions?|consideration|attraction|temptation|charm|pull|incentive|stimulus|aim|ends?|destination|goals?|target|fascination|induces?d?|possess(ed)?(es)?|move[sd]|inspires?d?|prompts|purposes?|seeks?|plans?|contemplate|desire|pursue|aims?|aspire|stimulates?d?|thinking|rouses|incites?d?|provokes?d?|instigates?d?|encourages?d?|tempts?(ed)?|fascinates?d?|lures?d?)/[A-Z]+", true), new Feature("#JUDGMENTAL", "\\b(SHOULD|(thoughts?|judgments?|decisions?|findings?|opinions?|assessments?|beliefs?|views?|impressions?|conceptions?|conclusions?|decide|decisions?|findings?|find|conceive|realizations?|realize|rate|understanding?|recommend|impressions?|understand|recognize|think|consider|believe|advise|conclude|indicate)/[A-Z]+)", true), new Feature("#INTERPRETATION", "\\b(meaning|significance|sense|essence|spirit|suggestions?|interpretations?|explanations?|diagnosis|solution|answer|rendition|translation|commentary|inference|deduction|imply|[Ll]ink|[Cc]omment|[Ee]xplain(ed)?|[Mm]eans?|[Ii]nterpret|[Gg]uess|signify|denote|[Ee]xpress|convey|[Ii]ndicate|declare|involve|affirm|[Ss]tate|construed?|translate|infer(red)?|render|[Ss]olve|disentangled?|unravel(ed)?|[Cc]haracterized?|[Cc]larify?(ied)?|[Ee]xplain(ed)?|tells?/[A-Z]+ of|speaks?/[A-Z]+ of|points?/[A-Z]+ to|alludes?/[A-Z]+ to|drives?/[A-Z]+ at|makes?/[A-Z]+ out|accounts?/[A-Z]+ for|comments?/[A-Z]+ upon)/[A-Z]+", true), new Feature("#EXPECTATIONAL", "\\bHAPPENEXPE", true), new Feature("DO", "\\b([Dd]o|[Dd]oes|[Dd]id|[Dd]oing|[Dd]one)n?/[A-Z]+", true), new Feature("HAVE", "\\b([Hh]ave|[Hh]as|[Hh]ad|[Hh]aving|'ve|'d)n?/[A-Z]+", true), new Feature("BE", "\\b([Aa]m|[Ii]s|[Aa]re|[Ww]as|[Ww]ere|[Bb]eing|[Bb]een|'m|'re|'s)n?/[A-Z]+", true), new Feature("MODAL", "\\b([Cc]an|[Mm]ay|[Ss]hall|[Ww]ill|'ll|[Cc]ould|[Mm]ight|[Ss]hould|[Ww]ould|[Mm]ust)n?/[A-Z]+|\\b[Ww]on/[A-Z]+", true), new Feature("OBJPRO", "\\b([Mm]e|[Uu]s|[Hh]im|[Tt]hem)/[A-Z]+", true), new Feature("PREP", "\\b([Aa]gainst|[Aa]mid|[Aa]midst|[Aa]mong|[Aa]t|[Bb]esides|[Bb]etween|Bb]y|[Dd]espite|[Dd]uring|[Ee]xcept|[Ff]or|[Ff]rom|[Ii]n|[Ii]nto|[Mm]inus|[Nn]otwithstanding|[Oo]f|[Oo]ff|[Oo]n|[Oo]nto|[Oo]pposite|[Oo]ut|[Pp]er|[Pp]lus|[Pp]ro|[Rr]e|[Tt]han|[Tt]hrough|[Tt]hroughout|[Tt]hru|[Tt]o|[Tt]oward|[Tt]owards|[Uu]pon|[Vv]ersus|[Vv]ia|[Ww]ith|[Ww]ithin|[Ww]ithout)/IN", true), new Feature("WHO", "\\b([Ww]hat|[Ww]here|[Ww]hen|[Hh]ow|[Ww]hether|[Ww]hy|[Ww]hoever|[Ww]homever|[Ww]hichever|[Ww]herever|[Ww]henever|[Ww]hatever|[Hh]owever)/[A-Z\\$]+", true), new Feature("ART", "\\b([Aa]|[Aa]n|[Tt]he)/[A-Z]+", true), new Feature("QUAN", "\\b([Ee]ach|[Aa]ll|[Ee]very|[Aa]ny|[Mm]any|[Mm]uch|[Ff]ew|[Ss]everal|[Ss]ome)/[A-Z]+", true), new Feature("ALL-P", "(\\.|\\!|\\?|\\:|\\;|\\-|\\,)/(\\.|\\:|\\,)", true), new Feature("ADV", "\\b[A-Za-z]+/RB[RS]?", true), new Feature("ADJ", "\\b[A-Za-z]+/JJ[RS]?", true), new Feature("VBN", "\\b[A-Za-z]+/(VBD|VBN)", true), new Feature("VBG", "\\b[A-Za-z]+/VBG", true), new Feature("VBZ", "\\b[A-Za-z]+/VBZ", true), new Feature("VB", "\\b[A-Za-z]+/VB", true), new Feature("NNS", "\\b[A-Za-z]+/NNS", true), new Feature("NNP", "\\b[A-Za-z]+/(NNP|NNPS)", true), new Feature("NN", "\\b[A-Za-z]+/NN", true), new Feature("NN", "\\b[A-Za-z]+/N", true), new Feature("QUOTE", "'/\"", true), new Feature("#CAUSALCONS", "\\b(BE ART effects?/[A-Z]+ of|BE due/[A-Z]+ to)/[A-Z]+", true), new Feature("#DEFINITION", "\\bTELL OBJPRO WHAT", true), new Feature("VERIFICATION", "\\b(MODAL|WOULD|SHOULD|DO|HAVE|BE)", false), new Feature("CONCEPTCOMPLETION", "(^|ALL-P)[ ]?(WHAT|WHO_|WHERE|WHEN|WHICH)", false), new Feature("DEFINITION", "\\bWHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)([^#]*#?[^#]*(#SPECIAL|#DEFINITION)|[ ]?(DET )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP))|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#DEFINITION)|WHAT (DET )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP) BE", false), new Feature("DISJUNCTION", "\\b(MODAL|WHICH|WOULD|SHOULD|DO|HAVE|BE)[^#]*#?[^#]*(#SPECIAL|#DISJUNCTION)", false), new Feature("EXAMPLE", "\\b(WHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?| (MODAL|WOULD|SHOULD|DO|HAVE|BE))[^#]*#?[^#]*(#SPECIAL|#EXAMPLE)", false), new Feature("QUANTIFICATION", "\\bWHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?[^#]*#?[^#]*(#SPECIAL|#QUANTIFICATION)|(^[ ]?|[ ]?ALL-P|PREP)[ ]?HOW (QUAN|ADJ|ADV)|^ (WOULD|MODAL) YOU[^#]*#?[^#]*(#SPECIAL|#QUANTIFICATION)", false), new Feature("FEATURESPEC", "\\bWHAT[^#]*#?[^#]*(#SPECIAL|#FEATURESPEC)|(#SPECIAL|#FEATURESPEC)", false), new Feature("ENABLEMENT", "\\b(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*(#SPECIAL|#ENABLEMENT)", false), new Feature("JUDGMENTAL", "\\b(YOU|YOUR) (#SPECIAL|#JUDGMENTAL)|(SHOULD|#SPECIAL|#JUDGMENTAL) (SUBJPRO|PRO|NN[SP]?[S]?)|^[ ]?(WHAT|HOW|WHY) SHOULD", false), new Feature("EXPECTATIONAL", "\\bWHY (HAVE|BE|DO)?[^#]*#?[^#]*NEG|MODAL (#SPECIAL|#CAUSALCONS) (#SPECIAL|#CAUSALANTE)", false), new Feature("CAUSALCONS", "\\b(WHAT| DO)[^#]*#?[^#]*(#SPECIAL|#CAUSALCONS)", false), new Feature("COMPARISON", "(^[ ]?WHAT|^[ ]?(WHP|WHICH)) (BE|MODAL|WOULD|SHOULD)?[^#]*#?[^#]*(#SPECIAL|#COMPARISON)|HOW[^#]*#?[^#]*(#SPECIAL|#COMPARISON)|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#COMPARISON)", false), new Feature("INSTRUMENTAL", "^[ ]?HOW (MODAL|WOULD|SHOULD|DO) ((ART )?NN[SP]?[S]?|YOU|SUBJPRO|PRO)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY) NN[SP]?[S]?[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)", false), new Feature("GOALORIENTATION", "^[ ]?WHY (DO|BE) (YOU|SUBJPRO|PRO|ART (#SPECIAL|#GOALORIENTATION)|(ART )?NN[SP]?[S]?)|(^[ ]?WHAT|^[ ]?(WHP|WHICH))([^#]*#?[^#]*(#SPECIAL|#GOALORIENTATION)|MODAL|WOULD|SHOULD PRO)|^[ ]?(WHAT|WHY) WOULD (ART |A )?(YOU|SUBJPRO|PRO|NN[SP]?[S]?)", false), new Feature("CAUSALANTE", "^[ ]?(WHY|HOW) (DO|BE|MODAL|WOULD|SHOULD)[^#]*#?[^#]*(VBD?N?G?|(#SPECIAL|#CAUSALANTE))|^ (DO|MODAL|WOULD|SHOULD)[^#]*#?[^#]*(#SPECIAL|#CAUSALANTE)|(^|ALL-P)[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[ ]? (#SPECIAL|#CAUSALANTE)", false), new Feature("INTERPRETATION", "(#SPECIAL|#INTERPRETATION)", false)]);
exports.features = features;

const patternInput$0040378 = (() => {
  const list$$1 = (0, _List.map)(function mapping(f) {
    const regex = (0, _RegExp.create)(f.Pattern);
    return [f.Name, regex, f.Replace];
  }, features);
  return (0, _List.partition)(function predicate(tupledArg) {
    return tupledArg[2];
  }, list$$1);
})();

const patterns = patternInput$0040378[1];
exports.patterns = patterns;
const casscade = patternInput$0040378[0];
exports.casscade = casscade;

function ApplyCascade(taggedSentence) {
  const matches = [];
  let temp = taggedSentence;
  (0, _Seq.iterate)(function (forLoopVar) {
    const inputSequence = (0, _RegExp.matches)(forLoopVar[1], temp);
    (0, _Seq.iterate)(function (forLoopVar$$1) {
      matches.push(forLoopVar[0]);
    }, inputSequence);
    temp = (0, _RegExp.replace)(forLoopVar[1], temp, forLoopVar[0]);
  }, casscade);
  return [temp, matches];
}

function ApplyPatterns(taggedSentence$$1) {
  const matches$$1 = [];
  (0, _Seq.iterate)(function (forLoopVar$$2) {
    if ((0, _RegExp.isMatch)(forLoopVar$$2[1], taggedSentence$$1)) {
      matches$$1.push(forLoopVar$$2[0]);
    }
  }, patterns);
  return matches$$1;
}

const questionRegex = (0, _RegExp.create)("^(PREP )?(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP|MODAL|DO|HAVE|BE|SHOULD|#KEYS_SPECIAL|#KEYS_JUDGEMENTAL|WOULD|WHICH).*");
exports.questionRegex = questionRegex;
const whRegex = (0, _RegExp.create)("(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP)");
exports.whRegex = whRegex;
const doHaveRegex = (0, _RegExp.create)("(MODAL|DO|HAVE|BE)");
exports.doHaveRegex = doHaveRegex;

function ForceIndirectQuestion(input) {
  if (!(0, _RegExp.isMatch)(questionRegex, input)) {
    const whMatches = (0, _RegExp.match)(whRegex, input);
    const dhMatches = (0, _RegExp.match)(doHaveRegex, input);

    if (whMatches != null) {
      return whMatches[0] + " " + input;
    } else if (dhMatches != null) {
      return dhMatches[0] + " " + input;
    } else {
      return "DO " + input;
    }
  } else {
    return input;
  }
}

const IndirectQuestionMode = (0, _Types.declare)(function QuestionClassifier_IndirectQuestionMode(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.IndirectQuestionMode = IndirectQuestionMode;

function IndirectQuestionMode$reflection() {
  return (0, _Reflection.union)("QuestionClassifier.IndirectQuestionMode", [], IndirectQuestionMode, () => ["Forced", "Relaxed"]);
}

const ClassificationMode = (0, _Types.declare)(function QuestionClassifier_ClassificationMode(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.ClassificationMode = ClassificationMode;

function ClassificationMode$reflection() {
  return (0, _Reflection.union)("QuestionClassifier.ClassificationMode", [], ClassificationMode, () => ["Monothetic", "AllFeatures"]);
}

function Classify(classificationMode, indirectQuestionMode, taggedSentence$$2) {
  var source$$1, projection$$2, source$$6, source$$4;
  const patternInput = ApplyCascade(taggedSentence$$2);
  const patternMatches = indirectQuestionMode.tag === 1 ? ApplyPatterns(patternInput[0]) : ApplyPatterns(ForceIndirectQuestion(patternInput[0]));
  const matches$$2 = [];
  (0, _Array.addRangeInPlace)((source$$1 = (0, _Seq.filter)(function predicate$$1(s) {
    return s.indexOf("#") === 0;
  }, patternInput[1]), (0, _Seq.mapIndexed)(function mapping$$1(i, s$$1) {
    return [s$$1, i + 1];
  }, source$$1)), matches$$2);
  (0, _Array.addRangeInPlace)((0, _Seq.mapIndexed)(function mapping$$2(i$$1, s$$2) {
    return [s$$2, i$$1 + 1];
  }, patternMatches), matches$$2);
  const matchWeights = Array.from((projection$$2 = function projection$$2(tuple$$2) {
    return tuple$$2[1];
  }, function (source$$7) {
    return (0, _Seq.sortWith)(function ($x$$5, $y$$6) {
      return -(0, _Util.comparePrimitives)(projection$$2($x$$5), projection$$2($y$$6));
    }, source$$7);
  })((source$$6 = (source$$4 = (0, _Seq.map)(function mapping$$3(tupledArg$$1) {
    return [(0, _String.replace)(tupledArg$$1[0], "#", ""), tupledArg$$1[1]];
  }, matches$$2), (0, _Map.groupBy)(function projection(tuple) {
    return tuple[0];
  }, source$$4, {
    Compare: _Util.comparePrimitives
  })), (0, _Seq.map)(function mapping$$4(tupledArg$$2) {
    const sum = (0, _Seq.sumBy)(function projection$$1(tuple$$1) {
      return tuple$$1[1];
    }, tupledArg$$2[1], {
      GetZero() {
        return 0;
      },

      Add($x$$3, $y$$4) {
        return $x$$3 + $y$$4;
      }

    }) * (0, _Seq.length)(tupledArg$$2[1]) | 0;
    return [tupledArg$$2[0], sum];
  }, source$$6))));
  let classification;
  const matchValue = (0, _Seq.tryHead)(matchWeights);

  if (matchValue == null) {
    classification = ["ASSERTION", []];
  } else {
    const s$$5 = matchValue[0];
    const i$$3 = matchValue[1] | 0;
    classification = [s$$5, matchWeights];
  }

  if (classificationMode.tag === 1) {
    return ["FEATURES", matches$$2];
  } else {
    return classification;
  }
}