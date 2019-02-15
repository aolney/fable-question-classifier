module QuestionClassifier

type Feature =
    {
        Name : string
        Pattern : string
        Replace : bool
    }

///Features used in the question classifier; Note this ordering affects behavior
let features =
 [
     //Raw word spotting
     {
         Name = "WHAT"
         Pattern = @"\b[Ww]hat/[A-Z]+"
         Replace = true
     }
     {
         Name = "HOW"
         Pattern = @"\b[Hh]ow/[A-Z]+"
         Replace = true
     }
     //Underscore b/c Biber has WHO category
     {
         Name = "WHO_"
         Pattern = @"\b([Ww]ho|[Ww]hose|[Ww]hom)/[A-Z]+"
         Replace = true
     }
     {
         Name = "WHERE"
         Pattern = @"\b[Ww]here/[A-Z]+"
         Replace = true
     }
     {
         Name = "WHEN"
         Pattern = @"\b[Ww]hen/[A-Z]+"
         Replace = true
     }
     {
         Name = "WHICH"
         Pattern = @"\b[Ww]hich/[A-Z]+"
         Replace = true
     }
     {
         Name = "WHY"
         Pattern = @"\b[Ww]hy/[A-Z]+"
         Replace = true
     }
     {
         Name = "WOULD"
         Pattern = @"\b[Ww]ould/[A-Z]+"
         Replace = true
     }
    //  {
    //      Name = "A"
    //      Pattern = @"\b[Aa]n?/[A-Z]+"
    //      Replace = true
    //  }
     {
         Name = "NEG"
         Pattern = @"\b([Nn]ever|[Nn]ot|[Nn]or|[Nn]either|n't|'t|t)/[A-Z]+"
         Replace = true
     }
     {
         Name = "YOU"
         Pattern = @"\b[Yy]ou/[A-Z]+"
         Replace = true
     }
     {
         Name = "YOUR"
         Pattern = @"\b[Yy]our/[A-Z]+"
         Replace = true
     }
     {
         Name = "SHOULD"
         Pattern = @"\b[Yy]our/[A-Z]+"
         Replace = true
     }
     {
         Name = "TELL"
         Pattern = @"\b[Tt]ell/[A-Z]+"
         Replace = true
     }
     {
         Name = "@FROM"
         Pattern = @"\b[Ff]rom/[A-Z]+"
         Replace = true
     }
     {
         Name = "BETWEEN"
         Pattern = @"\b[Bb]etween/[A-Z]+"
         Replace = true
     }
     {
         Name = "@AND"
         Pattern = @"\b[Aa]nd/[A-Z]+"
         Replace = true
     }
     {
         Name = "HAPPENCONS HAPPENANTE HAPPENEXPE"
         Pattern = @"\b[Hh]appen(s|ed)?/[A-Z]+"
         Replace = true
     }
     {
         Name = "#DISJUNCTION"
         Pattern = @"\b[Oo]r/[A-Z]+"
         Replace = true
     }
     {
         Name = "#DEFINITION"
         Pattern = @"\b([Dd]efinition|[Mm]eaning|[Dd]efine)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#EXAMPLE"
         Pattern = @"\b(example|type|kind|claim|evidence|illustration|instance|support|evidence|prototype|standard|exemplar|picture|case|demonstration|[Ss]how|[Dd]emonstrate|[Ee]xemplify|[Ii]llustrate|[Qq]ualify|typical|model|standard|exemplar)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#QUANTIFICATION"
         Pattern = @"\b(amount|number|sum|distance|measurement|length|width|size|height|average|total|approximation)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#FEATURESPEC"
         Pattern = @"\b(characteristics?|colors?|parts?|features?|sounds?|propert(y|ies)|attributes?|shapes?|smell(s|ed)?|taste(s|d)?|look(s|ed)?|feels?|felt|sound(s|ed)?|dimension|[Ss]pecify|[Ll]ist|[Dd]escribe|[Cc]haracterize)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#ENABLEMENT"
         Pattern = @"\b(tools|useful|helpful|indicated|helps?|need(ed)?|required?|helped|allows?|necessary|have/[A-Z]+ to|in/[A-Z]+ order/[A-Z]+ to)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#CAUSALCONS"
         Pattern = @"\b(outcomes?|results?|consequences?|effects?|originates?/[A-Z]+ (in|from)|a?rises?/[A-Z]+ from|springs?/[A-Z]+ from|emanates?/[A-Z]+ from|comes?/[A-Z]+ from|issues?/[A-Z]+ from|flows?/[A-Z]+ from|results?/[A-Z]+ from|depends?/[A-Z]+ (upon|on)|hangs?/[A-Z]+ (upon|on)|hinges?/[A-Z]+ (upon|on)|turns?/[A-Z]+ (upon|on)|conclusion/[A-Z]+ of)/[A-Z]+|HAPPENCONS"
         Replace = true
     }
     {
         Name = "#COMPARISON"
         Pattern = @"\b(differences?|similarity?(ies)?|[Dd]istinguish(ed|es)?|[Ss]eparate(d|s)?|[Vv]ar(y|eed|ies)?|[Dd]iscriminate(d|s)?|[Cc]ontrast(ed|s)?|[Dd]iffer(ed|s)?|same|different|similar|like|less|[Rr]elate(d|s)?|[Cc]ompare(d|s)?)/[A-Z]+|[a-z]+/JJR|TELL[^@]*@FROM|BETWEEN[^@]*@AND"
         Replace = true
     }
     {
         Name = "#INSTRUMENTAL"
         Pattern = @"\b(plan|scheme|design|proposal|suggestion|arrangement|outline|program|method|way|manner|form|mode|procedure|route|steps|process|used?)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#CAUSALANTE"
         Pattern = @"\b(reason|causes?d?|allows?(ed)?|led|lead(s)?|stems?(ed)?|occurs?(ed)?|transpires?(ed)?|made|because|unless)/[A-Z]+|HAPPENANTE"
         Replace = true
     }
     {
         Name = "#GOALORIENTATION"
         Pattern = @"\b(motivation|motives?|reasons?|grounds|principles?|intentions?|consideration|attraction|temptation|charm|pull|incentive|stimulus|aim|ends?|destination|goals?|target|fascination|induces?d?|possess(ed)?(es)?|move[sd]|inspires?d?|prompts|purposes?|seeks?|plans?|contemplate|desire|pursue|aims?|aspire|stimulates?d?|thinking|rouses|incites?d?|provokes?d?|instigates?d?|encourages?d?|tempts?(ed)?|fascinates?d?|lures?d?)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#JUDGMENTAL"
         Pattern = @"\b(SHOULD|(thoughts?|judgments?|decisions?|findings?|opinions?|assessments?|beliefs?|views?|impressions?|conceptions?|conclusions?|decide|decisions?|findings?|find|conceive|realizations?|realize|rate|understanding?|recommend|impressions?|understand|recognize|think|consider|believe|advise|conclude|indicate)/[A-Z]+)"
         Replace = true
     }
     {
         Name = "#INTERPRETATION"
         Pattern = @"\b(meaning|significance|sense|essence|spirit|suggestions?|interpretations?|explanations?|diagnosis|solution|answer|rendition|translation|commentary|inference|deduction|imply|[Ll]ink|[Cc]omment|[Ee]xplain(ed)?|[Mm]eans?|[Ii]nterpret|[Gg]uess|signify|denote|[Ee]xpress|convey|[Ii]ndicate|declare|involve|affirm|[Ss]tate|construed?|translate|infer(red)?|render|[Ss]olve|disentangled?|unravel(ed)?|[Cc]haracterized?|[Cc]larify?(ied)?|[Ee]xplain(ed)?|tells?/[A-Z]+ of|speaks?/[A-Z]+ of|points?/[A-Z]+ to|alludes?/[A-Z]+ to|drives?/[A-Z]+ at|makes?/[A-Z]+ out|accounts?/[A-Z]+ for|comments?/[A-Z]+ upon)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#EXPECTATIONAL"
         Pattern = @"\bHAPPENEXPE"
         Replace = true
     }
     //Bibersub pre patterns (note some of this is overriden above, e.g some modals)
     {
         Name = "DO"
         Pattern = @"\b([Dd]o|[Dd]oes|[Dd]id|[Dd]oing|[Dd]one)n?/[A-Z]+"
         Replace = true
     }
     {
         Name = "HAVE"
         Pattern = @"\b([Hh]ave|[Hh]as|[Hh]ad|[Hh]aving|'ve|'d)n?/[A-Z]+"
         Replace = true
     }
     {
         Name = "BE"
         Pattern = @"\b([Aa]m|[Ii]s|[Aa]re|[Ww]as|[Ww]ere|[Bb]eing|[Bb]een|'m|'re|'s)n?/[A-Z]+"
         Replace = true
     }
     {
         Name = "MODAL"
         Pattern = @"\b([Cc]an|[Mm]ay|[Ss]hall|[Ww]ill|'ll|[Cc]ould|[Mm]ight|[Ss]hould|[Ww]ould|[Mm]ust)n?/[A-Z]+|\b[Ww]on/[A-Z]+"
         Replace = true
     }
     {
         Name = "OBJPRO"
         Pattern = @"\b([Mm]e|[Uu]s|[Hh]im|[Tt]hem)/[A-Z]+"
         Replace = true
     }
     {
         Name = "PREP"
         Pattern = @"\b([Aa]gainst|[Aa]mid|[Aa]midst|[Aa]mong|[Aa]t|[Bb]esides|[Bb]etween|Bb]y|[Dd]espite|[Dd]uring|[Ee]xcept|[Ff]or|[Ff]rom|[Ii]n|[Ii]nto|[Mm]inus|[Nn]otwithstanding|[Oo]f|[Oo]ff|[Oo]n|[Oo]nto|[Oo]pposite|[Oo]ut|[Pp]er|[Pp]lus|[Pp]ro|[Rr]e|[Tt]han|[Tt]hrough|[Tt]hroughout|[Tt]hru|[Tt]o|[Tt]oward|[Tt]owards|[Uu]pon|[Vv]ersus|[Vv]ia|[Ww]ith|[Ww]ithin|[Ww]ithout)/IN" 
         Replace = true
     }
     {
         Name = "WHO"
         Pattern = @"\b([Ww]hat|[Ww]here|[Ww]hen|[Hh]ow|[Ww]hether|[Ww]hy|[Ww]hoever|[Ww]homever|[Ww]hichever|[Ww]herever|[Ww]henever|[Ww]hatever|[Hh]owever)/[A-Z\$]+" 
         Replace = true
     }
     {
         Name = "ART"
         Pattern = @"\b([Aa]|[Aa]n|[Tt]he)/[A-Z]+"
         Replace = true
     }
     {
         Name = "QUAN"
         Pattern = @"\b([Ee]ach|[Aa]ll|[Ee]very|[Aa]ny|[Mm]any|[Mm]uch|[Ff]ew|[Ss]everal|[Ss]ome)/[A-Z]+"
         Replace = true
     }
     {
         Name = "ALL-P"
         Pattern = @"(\.|\!|\?|\:|\;|\-|\,)/(\.|\:|\,)"
         Replace = true
     }
     {
         Name = "ADV"
         Pattern = @"\b[A-Za-z]+/RB[RS]?"
         Replace = true
     }
     {
         Name = "ADJ"
         Pattern = @"\b[A-Za-z]+/JJ[RS]?"
         Replace = true
     }
     {
         Name = "VBN"
         Pattern = @"\b[A-Za-z]+/(VBD|VBN)"
         Replace = true
     }
     {
         Name = "VBG"
         Pattern = @"\b[A-Za-z]+/VBG"
         Replace = true
     }
     {
         Name = "VBZ"
         Pattern = @"\b[A-Za-z]+/VBZ"
         Replace = true
     }
     {
         Name = "VB"
         Pattern = @"\b[A-Za-z]+/VB"
         Replace = true
     }
     {
         Name = "NNS"
         Pattern = @"\b[A-Za-z]+/NNS"
         Replace = true
     }
     {
         Name = "NNP"
         Pattern = @"\b[A-Za-z]+/(NNP|NNPS)"
         Replace = true
     }
     {
         Name = "NN"
         Pattern = @"\b[A-Za-z]+/NN"
         Replace = true
     }
     //Note this matches unknowns with default unknown receiving "N"
     {
         Name = "NN"
         Pattern = @"\b[A-Za-z]+/N"
         Replace = true
     }
     {
         Name = "QUOTE"
         Pattern = "'/\""
         Replace = true
     }
     //end bibersub
     //pick up some keyword patterns that required bibersub
     {
         Name = "#CAUSALCONS"
         Pattern = @"\b(BE ART effects?/[A-Z]+ of|BE due/[A-Z]+ to)/[A-Z]+"
         Replace = true
     }
     {
         Name = "#DEFINITION"
         Pattern = @"\bTELL OBJPRO WHAT"
         Replace = true
     }
     //begin non-replacing patterns
     {
         Name = "VERIFICATION"
         Pattern = @"\b(MODAL|WOULD|SHOULD|DO|HAVE|BE)"
         Replace = false
     }
     {
         Name = "CONCEPTCOMPLETION"
         Pattern = @"(^|ALL-P)[ ]?(WHAT|WHO_|WHERE|WHEN|WHICH)"
         Replace = false
     }
     {
         Name = "DEFINITION"
         Pattern = @"\bWHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)([^#]*#?[^#]*(#SPECIAL|#DEFINITION)|[ ]?(DET )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP))|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#DEFINITION)|WHAT (DET )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP) BE"
         Replace = false
     }
     {
         Name = "DISJUNCTION"
         Pattern = @"\b(MODAL|WHICH|WOULD|SHOULD|DO|HAVE|BE)[^#]*#?[^#]*(#SPECIAL|#DISJUNCTION)"
         Replace = false
     }
     {
         Name = "EXAMPLE"
         Pattern = @"\b(WHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?| (MODAL|WOULD|SHOULD|DO|HAVE|BE))[^#]*#?[^#]*(#SPECIAL|#EXAMPLE)"
         Replace = false
     }
     {
         Name = "QUANTIFICATION"
         Pattern = @"\bWHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?[^#]*#?[^#]*(#SPECIAL|#QUANTIFICATION)|(^[ ]?|[ ]?ALL-P|PREP)[ ]?HOW (QUAN|ADJ|ADV)|^ (WOULD|MODAL) YOU[^#]*#?[^#]*(#SPECIAL|#QUANTIFICATION)"
         Replace = false
     }
     {
         Name = "FEATURESPEC"
         Pattern = @"\bWHAT[^#]*#?[^#]*(#SPECIAL|#FEATURESPEC)|(#SPECIAL|#FEATURESPEC)"
         Replace = false
     }
     {
         Name = "ENABLEMENT"
         Pattern = @"\b(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*(#SPECIAL|#ENABLEMENT)"
         Replace = false
     }
     {
         Name = "JUDGMENTAL"
         Pattern = @"\b(YOU|YOUR) (#SPECIAL|#JUDGMENTAL)|(SHOULD|#SPECIAL|#JUDGMENTAL) (SUBJPRO|PRO|NN[SP]?[S]?)|^[ ]?(WHAT|HOW|WHY) SHOULD"
         Replace = false
     }
     {
         Name = "EXPECTATIONAL"
         Pattern = @"\bWHY (HAVE|BE|DO)?[^#]*#?[^#]*NEG|MODAL (#SPECIAL|#CAUSALCONS) (#SPECIAL|#CAUSALANTE)"
         Replace = false
     }
     {
         Name = "CAUSALCONS"
         Pattern = @"\b(WHAT| DO)[^#]*#?[^#]*(#SPECIAL|#CAUSALCONS)"
         Replace = false
     }
     {
         Name = "COMPARISON"
         Pattern = @"(^[ ]?WHAT|^[ ]?(WHP|WHICH)) (BE|MODAL|WOULD|SHOULD)?[^#]*#?[^#]*(#SPECIAL|#COMPARISON)|HOW[^#]*#?[^#]*(#SPECIAL|#COMPARISON)|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#COMPARISON)"
         Replace = false
     }
     {
         Name = "INSTRUMENTAL"
         Pattern = @"^[ ]?HOW (MODAL|WOULD|SHOULD|DO) ((ART )?NN[SP]?[S]?|YOU|SUBJPRO|PRO)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY) NN[SP]?[S]?[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)|^ (MODAL|WOULD) YOU[^#]*#?[^#]*(#SPECIAL|#INSTRUMENTAL)"
         Replace = false
     }
     {
         Name = "GOALORIENTATION"
         Pattern = @"^[ ]?WHY (DO|BE) (YOU|SUBJPRO|PRO|ART (#SPECIAL|#GOALORIENTATION)|(ART )?NN[SP]?[S]?)|(^[ ]?WHAT|^[ ]?(WHP|WHICH))([^#]*#?[^#]*(#SPECIAL|#GOALORIENTATION)|MODAL|WOULD|SHOULD PRO)|^[ ]?(WHAT|WHY) WOULD (ART |A )?(YOU|SUBJPRO|PRO|NN[SP]?[S]?)"
         Replace = false
     }
     {
         Name = "CAUSALANTE"
         Pattern = @"^[ ]?(WHY|HOW) (DO|BE|MODAL|WOULD|SHOULD)[^#]*#?[^#]*(VBD?N?G?|(#SPECIAL|#CAUSALANTE))|^ (DO|MODAL|WOULD|SHOULD)[^#]*#?[^#]*(#SPECIAL|#CAUSALANTE)|(^|ALL-P)[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[ ]? (#SPECIAL|#CAUSALANTE)"
         Replace = false
     }
     {
         Name = "INTERPRETATION"
         Pattern = @"(#SPECIAL|#INTERPRETATION)"
         Replace = false
     }

 ]

let casscade,patterns =
    features
    |> List.map( fun f -> 
        let regex = System.Text.RegularExpressions.Regex( f.Pattern )
        (f.Name, regex, f.Replace ) )
    |> List.partition( fun (_,_,replace) -> replace )

///Applies a series of finite state transducers that convert the text into a sequence of tags (cf. supertags)
let ApplyCascade( taggedSentence : string ) =
    let matches = ResizeArray<string>()
    let mutable temp = taggedSentence
    for name,regex,_ in casscade do
        //count the matches
        for _ in regex.Matches( temp ) do
            matches.Add( name )
        //transform the string
        temp <- regex.Replace( temp, name )
        // if regex.IsMatch( temp ) then
        //     matches.Add( name )
        //     temp <- regex.Replace( temp, name )
    //
    (temp,matches)

///Applies a series of patterns but does not transduce
let ApplyPatterns( taggedSentence : string ) =
    let matches = ResizeArray<string>()
    for name,regex,_ in patterns do
        if regex.IsMatch( taggedSentence ) then
            matches.Add( name )
    //
    matches

let questionRegex = System.Text.RegularExpressions.Regex("^(PREP )?(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP|MODAL|DO|HAVE|BE|SHOULD|#KEYS_SPECIAL|#KEYS_JUDGEMENTAL|WOULD|WHICH).*")
let whRegex = System.Text.RegularExpressions.Regex("(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP)")
let doHaveRegex = System.Text.RegularExpressions.Regex("(MODAL|DO|HAVE|BE)")

///If the input is not a canoncial question, see if question indicators are present and prepend them to the front if so
let ForceIndirectQuestion( input ) =
    if questionRegex.IsMatch( input ) |> not then
        let whMatches = whRegex.Match(input)
        let dhMatches = doHaveRegex.Match(input)
        if whMatches.Success then
            whMatches.Value + " " + input
        elif dhMatches.Success then
            dhMatches.Value + " " + input
        else
            "DO " + input
    else
        input

type IndirectQuestionMode = 
    | Forced
    | Relaxed

type ClassificationMode = 
    | Monothetic 
    | AllFeatures

let Classify ( classificationMode : ClassificationMode ) ( indirectQuestionMode : IndirectQuestionMode ) ( taggedSentence : string ) = 
    //apply cascade and patterns, saving matches
    let transformedSentence,cascadeMatches = taggedSentence |> ApplyCascade
    let patternMatches = 
        match indirectQuestionMode with
        | Forced -> transformedSentence |> ForceIndirectQuestion |> ApplyPatterns
        | Relaxed -> transformedSentence |> ApplyPatterns

    //Assign a score to each match based on the order of the matches (low is better)
    let matches = new ResizeArray<string*int>()

    cascadeMatches 
    |> Seq.filter( fun s -> s.StartsWith("#" ) )
    |> Seq.mapi( fun i s -> (s, i+1) ) 
    |> matches.AddRange

    patternMatches 
    |> Seq.mapi( fun i s -> (s, i+1) )
    |> matches.AddRange

    //The original tcl was hard to follow here. The major ideas are
    // 1. If no patterns match but a key matched, go with keys
    // 2. If both match, find a matching pair and choose that
    // 3. If no pair found, choose the highest ranked pattern match
    // 4. If no key matches but patterns do, choose the highest ranked pattern match
    // The following code should subsume this logic
    //combine the cascade and pattern scores by summing
    let matchWeights =
        matches
        |> Seq.map( fun (s,i) -> (s.Replace("#", ""), i )) //removing hash will merge keywords and patterns 
        |> Seq.groupBy fst
        |> Seq.map( fun (g,s) -> 
            //sum ranks but multiply by the number of matches
            let sum = (s |> Seq.sumBy snd ) * (Seq.length s ) 
            (g, sum)
        )
        |> Seq.sortByDescending snd
        |> ResizeArray

    //A little wonky for debugging purposes: return the classification and the scores
    let classification = 
        match matchWeights |> Seq.tryHead with
        | Some(s,i) -> (s, matchWeights)
        | None -> ("ASSERTION", new ResizeArray<string*int>() )

    match classificationMode with
    | Monothetic -> classification
    | AllFeatures -> ("FEATURES", matches ) //Again wonk; fake a classification and return all the matches before scoring

  
          