#!/usr/bin/tclsh
# This program implements a speech act classifier, first by
# distinguishing between questions, assertions, and directives,
# and then by handling these as particular types of questions.

# They are handled as questions because in the domain of use, tutoring,
# all actions, bar some assertions, can be viewed as information-seeking

# DEPENDENCIES:
# 1. Must be run in same directory as the Brill Tagger

# Andrew Olney dba SpeakEasy Communications 
# for the University of Memphis, October 2001
# aolney at hotmail dot com
# 
# UPDATE 2019
# This is not the definite orginal code from the 2003 paper but as close 
# as I can get without having TCL dependencies that no longer function 
# (e.g. bltwish). Actually this code seems to be an interactive demo I 
# adapted from the original code around that time.
# I've also modified it slightly to remove the Brill
# dependency, which I'm able to do since I have a pre-tagged file from 
# 2001. The pre-tagged file, labeled data, and code below allow the new
# implementation to be reasonably modeled and validated against the 
# original. Some small modifications to the original have been made for
# this purpose


# biberSub creates a notation compatible with Douglas Biber (1988)
proc biberSub {line} {
	# __CONJ__
	#NOTE: Divergence from Biber, see page 239 ALL-P/T#+rather+T#/,/xxx
	regsub -all {([ ]|^)(([Aa]lternatively|[Aa]ltogether|[Cc]onsequently|[Cc]onversely|[Ee]g|[Ee]\.g\.|[Ee]lse|[Ff]urthermore|[Hh]ence|[Hh]owever|[Ii]\.e\.|[Ii]nstead|[Ll]ikewise|[Mm]oreover|[Nn]amely|[Nn]evertheless|[Nn]onetheless|[Nn]otwithstanding|[Oo]therwise|[Rr]ather|[Ss]imilarly|[Tt]herefore|[Tt]hus|[Vv]iz)/[A-Z]+|[Ii]n/[A-Z]+ (comparison|contrast|particular|addition|conclusion|consequence|sum|summary|any/[A-Z]+ event|any/[A-Z]+ case|other/[A-Z]+ words)/[A-Z]+|[Ff]or/[A-Z]+ (example|instance)/[A-Z]+|[Bb]y/[A-Z]+ (contrast|comparison)/[A-Z]+|[Aa]s/[A-Z]+ a/[A-Z]+ (result|consequence)/[A-Z]+|[Oo]n/[A-Z]+ the/[A-Z]+ (contrary|other/[A-Z]+ hand)/[A-Z]+|[;,:]/[^ ]+ that/[A-Z]+ (is|else|altogether)/[A-Z]+|(\.|\!|\?|\:|\;|\-|\,)/(\.|\:|\,) rather/[A-Z]+( ,/,)?)} $line { CONJ} line1

	# __DO__
	regsub -all {([ ]|^)(([Dd]o|[Dd]oes|[Dd]id|[Dd]oing|[Dd]one)n?/[A-Z]+)([ ]'t/[A-Z]+)?} $line1 { DO} line2
	
	#__HAVE__
	regsub -all {([ ]|^)(([Hh]ave|[Hh]as|[Hh]ad|[Hh]aving|'ve|'d)n?/[A-Z]+)([ ]'t/[A-Z]+)?} $line2 { HAVE} line3
	
	# __BE__
	regsub -all {([ ]|^)([Aa]m|[Ii]s|[Aa]re|[Ww]as|[Ww]ere|[Bb]eing|[Bb]een|'m|'re|'s)n?/[A-Z]+([ ]'t/[A-Z]+)?} $line3 { BE} line4a
        regsub -all {'sn?/V[A-Z]+} $line4a { BE} line4b

	# __MODAL__
	regsub -all {([ ]|^)((([Cc]an|[Mm]ay|[Ss]hall|[Ww]ill|'ll|[Cc]ould|[Mm]ight|[Ss]hould|[Ww]ould|[Mm]ust)n?/[A-Z]+)([ ]'t/[A-Z]+)?)|([Ww]on/[A-Z]+)([ ]'t/[A-Z]+)} $line4b { MODAL} line5
	
	# __AUX__ not replaced; AUX = (MODAL|DO|HAVE|BE)
	
	# __SUBJPRO__
	regsub -all {([ ]|^)([Ii]|[Hh]e|[Ww]e|[Ss]he|[Tt]hey)/[A-Z]+} $line5 { SUBJPRO} line6
	
	# __OBJPRO__
	regsub -all {([ ]|^)([Mm]e|[Uu]s|[Hh]im|[Tt]hem)/[A-Z]+} $line6 { OBJPRO} line7
	
	# __POSSPRO__
	regsub -all {([ ]|^)([Mm]y|[Oo]ur|[Yy]our|[Hh]is|[Tt]heir|[Ii]ts)/[A-Z]+\$} $line7 { POSSPRO} line8
	
	# __REFLEXPRO__
	regsub -all {([ ]|^)([Mm]yself|[Oo]urselves|[Hh]imself|[Tt]hemselves|[Hh]erself|[Yy]ourself|[Yy]ourselves|[Ii]tself)/[A-Z]+} $line8 { REFLEXPRO} line9
	
	# __PRO__          --->PRO only partially replaced; Biber PRO ->SUBJPRO|OBJPRO|POSSPRO|REFLEXPRO|([ ]|^)([Yy]ou|[Hh]er|[Ii]t)/[A-Z]+\$?
	regsub -all {([ ]|^)([Yy]ou|[Hh]er|[Ii]t)/[A-Z]+\$?} $line9 { PRO} line10
	
	# __PREP__        
	regsub -all {([ ]|^)([Aa]gainst|[Aa]mid|[Aa]midst|[Aa]mong|[Aa]t|[Bb]esides|[Bb]etween|Bb]y|[Dd]espite|[Dd]uring|[Ee]xcept|[Ff]or|[Ff]rom|[Ii]n|[Ii]nto|[Mm]inus|[Nn]otwithstanding|[Oo]f|[Oo]ff|[Oo]n|[Oo]nto|[Oo]pposite|[Oo]ut|[Pp]er|[Pp]lus|[Pp]ro|[Rr]e|[Tt]han|[Tt]hrough|[Tt]hroughout|[Tt]hru|[Tt]o|[Tt]oward|[Tt]owards|[Uu]pon|[Vv]ersus|[Vv]ia|[Ww]ith|[Ww]ithin|[Ww]ithout)/IN} $line10 { PREP} line11
	
	# __PUB__
	regsub -all {([ ]|^)([Aa]cknowledge|[Aa]dmit|[Aa]gree|[Aa]ssert|[Cc]laim|[Cc]omplain|[Dd]eclare|[Dd]eny|[Ee]xplain|[Hh]int|[Ii]nsist|[Mm]ention|[Pp]roclaim|[Pp]romise|[Pp]rotest|[Rr]emark|[Rr]eply|[Rr]eport|[Ss]ay|[Ss]uggest|[Ss]wear|[Ww]rite)/[A-Z]+} $line11 { PUB} line12
	
	# __PRV__
	regsub -all {([ ]|^)([Aa]nticipate|[Aa]ssume|[Bb]elieve|[Cc]onclude|[Dd]ecide|[Dd]emonstrate|[Dd]etermine|[Dd]iscover|[Dd]oubt|[Ee]stimate|[Ff]ear|[Ff]eel|[Ff]ind|[Ff]orget|[Gg]uess|[Hh]ear|[Hh]ope|[Ii]magine|[Ii]mply|[Ii]ndicate|[Ii]nfer|[Kk]now|[Ll]earn|[Mm]ean|[Nn]otice|[Pp]rove|[Rr]ealize|[Rr]ecognize|[Rr]emember|[Rr]eveal|[Ss]ee|[Ss]how|[Ss]uppose|[Tt]hink|[Uu]nderstand)/[A-Z]+} $line12 { PRV} line13
	
	# __SUA__
	regsub -all {([ ]|^)([Aa]gree|[Aa]rrange|[Aa]sk|[Bb]eg|[Cc]ommand|[Dd]ecide|[Dd]emand|[Gg]rant|[Ii]nsist|[Ii]nstruct|[Oo]rdain|[Pp]ledge|[Pp]ronounce|[Pp]ropose|[Rr]ecommend|[Rr]equest|[Ss]tipulate|[Ss]uggest|[Uu]rge)/[A-Z]+} $line13 { SUA} line14
	
	# __WHP__
	regsub -all {([ ]|^)([Ww]ho|[Ww]hom|[Ww]hose|[Ww]hich)/([A-Z\$]+)} $line14 { WHP} line15
	
	# __WHO__
	regsub -all {([ ]|^)([Ww]hat|[Ww]here|[Ww]hen|[Hh]ow|[Ww]hether|[Ww]hy|[Ww]hoever|[Ww]homever|[Ww]hichever|[Ww]herever|[Ww]henever|[Ww]hatever|[Hh]owever)/([A-Z\$]+)} $line15 { WHO} line16
	
	# __ART__
	regsub -all {([ ]|^)([Aa]|[Aa]n|[Tt]he)/([A-Z]+)} $line16 { ART} line17
	
	# __DEM__
	regsub -all {([ ]|^)([Tt]his|[Tt]hat|[Tt]hese|[Tt]hose)/DT} $line17 { DEM} line18
	
	# __QUAN__
	regsub -all {([ ]|^)([Ee]ach|[Aa]ll|[Ee]very|[Aa]ny|[Mm]any|[Mm]uch|[Ff]ew|[Ss]everal|[Ss]ome)/([A-Z]+)} $line18 { QUAN} line19
	
	# __NUM__
	regsub -all {([ ]|^)([Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Nn]ine|[Tt]en|[Ee]leven|[Tt]welve|[Tt]hirteen|[Ff]ourteen|[Ff]ifteen|[Ss]ixteen|[Ss]eventeen|[Ee]ighteen|[Nn]ineteen|[Tt]wenty|[Hh]undred|[Tt]housand|[Mm]illion)/([A-Z]+)} $line19 { NUM} line20
	
	# __DET__ not replaced DET = (ART|DEM|QUAN|NUM)
	
	# __ORD__
	regsub -all {([ ]|^)([Ff]irst|[Ss]econd|[Tt]hird|[Ff]ourth|[Ff]ifth|[Ss]ixth|[Ss]eventh|[Ee]ighth|[Nn]ineth|[Tt]enth|[Ee]leventh|[Tt]welfth|[Tt]hirteenth|[Ff]ourteenth|[Ff]ifteenth|[Ss]ixteenth|[Ss]eventeenth|[Ee]ighteenth|[Nn]ineteenth|[Tt]wentieth|[Hh]undredth|[Tt]housandth|[Mm]illionth)/[A-Z]+} $line20 { ORD} line21
	
	# __QUANPRO__
	regsub -all {([ ]|^)([Ee]verybody|[Ss]omebody|[Aa]nybody|[Ee]veryone|[Ss]omeone|[Aa]nyone|[Ee]verything|[Ss]omething|[Aa]nything)/[A-Z]+} $line21 { QUANPRO} line22
	
	# __TITLE__
	regsub -all {(Mr\.?|Mrs\.?|Miss|Ms\.?|Madame|Mme\.?|Mdme\.?|Dr\.?)/[A-Z]+} $line22 {TITLE} line23
	
	# __CL-P__
	regsub -all {(\.|\!|\?|\:|\;|\-|)/(\.|\:)} $line23 {CL-P} line24
	
	# __ALL-P__
	regsub -all {(\.|\!|\?|\:|\;|\-|\,)/(\.|\:|\,)} $line24 {ALL-P} line25
	
	#-------------------------------------------------------------------------------------
	# 2) Clean up parser tags to give Biber compatible category : N/V/ADJ/ADV substitution
	#-------------------------------------------------------------------------------------
	regsub -all {[A-Za-z]+/RB[RS]?} $line25 {ADV} line26
	regsub -all {[A-Za-z]+/JJ[RS]?} $line26 {ADJ} line27
	regsub -all {[A-Za-z]+/(VBD|VBN)} $line27 {VBN} line28
	regsub -all {[A-Za-z]+/VBG} $line28 {VBG} line29
	regsub -all {[A-Za-z]+/VB} $line29 {VB} line30
	regsub -all {[A-Za-z]+/VBZ} $line30 {VBZ} line31
	regsub -all {[A-Za-z]+/NN} $line31 {NN} line32
	regsub -all {[A-Za-z]+/NNS} $line32 {NNS} line33
	regsub -all {[A-Za-z]+/(NNP|NNPS)} $line33 {NNP} line34
	
	# NOTE: The following two categories were problematic in that Biber is not consistent with the granularity of substitutions. 
	#       Accordingly the following code replaces meta categories when needed, and should be read as the respective meta category
	# V = (VBD|VBG|VBN|VBP|VBZ|VB)
	# N = NN[SP]?[S]?

	#------------------------------------
	# Finished 2) cleaning up parser tags
	#------------------------------------
	return $line34 
}

    #-----------------------------------------
    # Finished 1) Subsituting Biber's notation
    #-----------------------------------------

######################################
# SPEECH ACT CLASSIFIER MODIFICATIONS
######################################

# read input from command line
set expression [lindex $argv 0]
# open and write to this file for tagging - IGNORE, USING PRETAGGED INPUT
# set afile [open input.txt w]

#decode HTML
regsub -all {[^=]*=} $expression {} line1
regsub -all {\+} $line1 { } line2a

# Make sure that expression is a valid string for tcl
regsub -all {(\. |\.)} $line2a " . \n" line2
regsub -all {(, |,)} $line2 { , } line3
regsub -all {(! |!)} $line3 " ! \n" line4
regsub -all {(\? |\?)} $line4 " ? \n" line5
regsub -all {(; |;)} $line5 { ; } line6
regsub -all {(: |:)} $line6 { : } line7
regsub -all {(" |")} $line7 { " } line8
regsub -all {(' |')} $line8 { '} line8a
# backslash special tcl characters
regsub -all {\"} $line8a {\\"} line9
regsub -all {\{} $line9 {\\{} line10
regsub -all {\}} $line10 {\\}} line11
regsub -all {\[} $line11 {\\[} line12
regsub -all {\]} $line12 {\\]} line13
regsub -all {\)} $line13 {\)} line14
regsub -all {\(} $line14 {\(} line15
# File I/O - IGNORE, USING PRETAGGED INPUT
# puts $afile $line15
# close $afile

# Tag next - IGNORE, USING PRETAGGED INPUT
# catch {exec ./tagger LEXICON.BROWN.AND.WSJ input.txt BIGRAMS LEXICALRULEFILE.BROWN CONTEXTUALRULEFILE.BROWN > output.txt} result

# - IGNORE, USING PRETAGGED INPUT
# set afile [open output.txt r]
# gets $afile oline
# close $afile

#puts stdout $result
#puts stdout " ------- $oline"

# NEW: bypass tagger, assumes command line argument is Brill tagged; skip regsub validation block above b/c it breaks some tags
set oline $expression

set classList {}
set keyList {}

#---------------------
# First detect frozen 
#---------------------

# KEYWORDS
regsub -all {(believed?|comprehend(ed)?|confus(ed)?|explain(ed)?|follow(ed)?|guess(ed)?|imagined?|interpret(ed)?|known?|knew|messed|recogniz(ed)?|seen?|saw|suppos(ed)?|sure|think|thought|understand|understood)/[A-Z]+} $oline {#METACOGNITIVE} frozen1
regsub -all {(add|added|answer|answered|clarify|clarified|define|defined|mean|meant|miss|missed|modify|modified|note|noted|repeat|repeated|restate|restated|say|said|saying|speak|spoken|speaking|specify|specified|tell|told|telling)/[A-Z]+} $frozen1 {#METACOMMUNICATIVE} frozen2

set notFrozen 1
set frozen3 [biberSub $frozen2]

if {[regsub -all {^[ ]?SUBJPRO (DO )?[^#]*(#METACOGNITIVE|#METACOMMUNICATIVE)} $frozen3 {ASSERTION} ignore] >=1} {
    set notFrozen 0
    set type "FROZEN_ASSERTION"
    set classList [list FROZEN_ASSERTION]
} elseif {[regsub -all {^[ ]?AUX SUBJPRO [^#]*#METACOMMUNICATIVE} $frozen3 {QUESTION} ignore] >=1} {
    set notFrozen 0
    set type "FROZEN_QUESTION"
    set classList [list FROZEN_QUESTION]
} elseif {[regsub -all {^[ ]?#METACOMMUNICATIVE OBJPRO} $frozen3 {DIRECTIVE} ignore] >=1} {
    set notFrozen 0
    set type "FROZEN_DIRECTIVE"
    set classList [list FROZEN_DIRECTIVE]
}


if {$notFrozen==1} {    

#--------------------------------
# KEYWORD EXTRACTION AND COUNTING
#--------------------------------


set situatedKeys 0
set factualKeys 0

regsub -all {([ ]|^)[Ww]hat/[A-Z]+} $oline { WHAT} keyLine1
regsub -all {([ ]|^)[Hh]ow/[A-Z]+} $keyLine1 { HOW} keyLine2
regsub -all {([ ]|^)[Ww]ho/[A-Z]+} $keyLine2 { WHO_} keyLine3
regsub -all {([ ]|^)[Ww]here/[A-Z]+} $keyLine3 { WHERE} keyLine4
regsub -all {([ ]|^)[Ww]hen/[A-Z]+} $keyLine4 { WHEN} keyLine5
regsub -all {([ ]|^)[Ww]hich/[A-Z]+} $keyLine5 { WHICH} keyLine6
regsub -all {([ ]|^)[Ww]hy/[A-Z]+} $keyLine6 { WHY} keyLine7
regsub -all {would/[A-Z]+} $keyLine7 {WOULD} keyLine8
regsub -all { an?/[A-Z]+} $keyLine8 { A} keyLine9
regsub -all {(never|not|nor|neither|n't| 't| t)/[A-Z]+} $keyLine9 { NEG} keyLine10
regsub -all {you/[A-Z]+} $keyLine10 {YOU} keyLine11
regsub -all {your/[A-Z]+} $keyLine11 {YOUR} keyLine12
regsub -all {Should/[A-Z]+} $keyLine12 {SHOULD} keyLine13
regsub -all { tell/[A-Z]+} $keyLine13 { TELL} keyLine13b
regsub -all { from/[A-Z]+} $keyLine13b { #FROM} keyLine13c
regsub -all { between/[A-Z]+} $keyLine13c { BETWEEN} keyLine13d
regsub -all { and/[A-Z]+} $keyLine13d { #AND} keyLine13e
regsub -all { happens?(ed)?/[A-Z]+} $keyLine13e { HAPPENS HAPPENED HAPPEN_E} keyLine13f
regsub -all { \?/.} $keyLine13f { QUESTION_MARK} keyLine13g
	
# __DISJUNCTION__
set disKeys [regsub -all { or/[A-Z]+} $keyLine13g { #KEYS_DISJUNCTION} keyLine13h]
incr factualKeys $disKeys
if {$disKeys >= 1} {
    lappend keyList [list DISJUNCTION]
}
# __DEFINITION__
# took out tell
set defKeys [regsub -all {((definition|meaning|define)/[A-Z]+|TELL OBJPRO WHO|([ ]|^)[Dd]efine/[A-Z]+)} $keyLine13h { #KEYS_DEFINITION} keyLine14]
incr factualKeys $defKeys
if {$defKeys >= 1} {
    lappend keyList [list DEFINITION]
}
# __EXAMPLE__
set exaKeys [regsub -all {(example|type|kind|claim|evidence|illustration|instance|support|evidence|prototype|standard|exemplar|picture|case|demonstration|show|demonstrate|exemplify|illustrate|qualify|typical|model|standard|exemplar)/[A-Z]+} $keyLine14 {#KEYS_EXAMPLE} keyLine15]
incr factualKeys $exaKeys
if {$exaKeys >= 1} {
    lappend keyList [list EXAMPLE]
}
# __QUANTIFICATION__
set quaKeys [regsub -all {(amount|number|sum|distance|measurement|length|width|size|height|average|total|approximation)/[A-Z]+} $keyLine15 {#KEYS_QUANTIFICATION} keyLine16]
incr factualKeys $quaKeys
if {$quaKeys >= 1} {
    lappend keyList [list QUANTIFICATION]
}
# __FEATURE SPECIFICATION__
set feaKeys [regsub -all {((characteristics|color|parts|features|sound|properties|attributes|shape|smell|taste|look|feel|sound|dimension)/[A-Z]+|([ ]|^)([Ss]pecify|[Ll]ist|[Dd]escribe|[Cc]haracterize)/[A-Z]+)} $keyLine16 { #KEYS_FEATURESPEC} keyLine17]
incr factualKeys $feaKeys
if {$feaKeys >= 1} {
    lappend keyList [list FEATURE_SPECIFICATION]
}
# __ENABLEMENT__     
set enaKeys [regsub -all {(tools|useful|helpful|indicated|help|need(ed)?|required?|help|allows?|necessary|in/[A-Z]+ order/[A-Z]+ to)/[A-Z]+} $keyLine17 {#KEYS_ENABLEMENT} keyLine18]
incr situatedKeys $enaKeys
if {$enaKeys >= 1} {
    lappend keyList [list ENABLEMENT]
}
# __CAUSAL CONSEQUENT__

##########################################
# NOTE: check happens logic
# regsub -all {happens?/[A-Z]+ (if|because)/[A-Z]+} $keyLine { IGNORE} keyLine2
##########################################
set conKeys [regsub -all {((outcomes?|results?|consequences?|effects?|BE ART effects?/[A-Z]+ of|BE due/[A-Z]+ to|originates?/[A-Z]+ (in|from)|rises?/[A-Z]+ from|springs?/[A-Z]+ from|emanates?/[A-Z]+ from|comes?/[A-Z]+ from|issue/[A-Z]+ from|flows?/[A-Z]+ from|results?/[A-Z]+ from|depends?/[A-Z]+ upon|hangs?/[A-Z]+ upon|hinges?/[A-Z]+ upon|turns?/[A-Z]+ upon|conclusion/[A-Z]+ of)/[A-Z]+|HAPPENS)} $keyLine18 {#KEYS_CAUSALCONS} keyLine19]
incr situatedKeys $conKeys
if {$conKeys >= 1} {
    lappend keyList [list CAUSAL_CONSEQUENT]
}
# __COMPARISON__
set comKeys [regsub -all {([ ]|^)((differences?|similarity?(ies)?|distinguish|separate|vary|discriminate|contrast|differ|same|different|similar|like|differ|less|related|compare)/[A-Z]+|[a-z]+/JJR|TELL[^#]*#FROM|BETWEEN[^#]*#AND)} $keyLine19 { #KEYS_COMPARISON} keyLine20]
incr situatedKeys $comKeys
if {$comKeys >= 1} {
    lappend keyList [list COMPARISON]
}
# __INSTRUMENTAL__
set insKeys [regsub -all {([ ]|^)(plan|scheme|design|proposal|suggestion|arrangement|outline|program|method|way|manner|form|mode|procedure|route|steps|process|used?)/[A-Z]+} $keyLine20 { #KEYS_INSTRUMENTAL} keyLine21]
incr situatedKeys $insKeys
if {$insKeys >= 1} {
    lappend keyList [list INSTRUMENTAL]
}
# __CAUSAL ANTECEDENT__
set antKeys [regsub -all {([ ]|^)((reason|causes?d?|allows?(ed)?|led|leads|stems?(ed)?|occurs?(ed)?|transpires?(ed)?|made|because|unless)/[A-Z]+|HAPPENED)} $keyLine21 { #KEYS_CAUSALANTE} keyLine22]
incr situatedKeys $antKeys
if {$antKeys >= 1} {
    lappend keyList [list CAUSAL_ANTECEDENT]
}
# __GOAL ORIENTATION__
set goaKeys [regsub -all {([ ]|^)(motivation|motives?|reasons?|grounds|principles?|intentions?|consideration|attraction|temptation|charm|pull|incentive|stimulus|aim|ends?|destination|goals?|target|fascination|induces?d?|possess(ed)?(es)?|move[sd]|inspires?d?|prompts|purposes?|seeks?|plans?|contemplate|desire|pursue|aims?|aspire|stimulates?d?|thinking/[A-Z]+ of|rouses|incites?d?|provokes?d?|instigates?d?|encourages?d?|tempts?(ed)?|fascinates?d?|lures?d?)/[A-Z]+} $keyLine22 { #KEYS_GOALORIENTATION} keyLine23]
incr situatedKeys $goaKeys
if {$goaKeys >= 1} {
    lappend keyList [list GOAL_ORIENTATION]
}
# __JUDGEMENTAL__
set judKeys [regsub -all {(SHOULD|(thoughts?|judgments?|decisions?|findings?|opinions?|assessments?|beliefs?|views?|impressions?|conceptions?|conclusions?|decide|decisions?|findings?|find|conceive|realizations?|realize|rate|understanding?|recommend|impressions?|understand|recognize|think|consider|believe|advise|conclude|indicate)/[A-Z]+)} $keyLine23 {#KEYS_JUDGEMENTAL} keyLine24]
incr situatedKeys $judKeys
if {$judKeys >= 1} {
    lappend keyList [list JUDGMENTAL]
}
# __INTERPRETATION__
set intKeys [regsub -all {([ ]|^)(meaning|significance|sense|essence|spirit|suggestions?|interpretations?|explanations?|diagnosis|solution|answer|rendition|translation|commentary|inference|deduction|imply|[Ll]ink|[Cc]omment|[Mm]ean|[Ee]xplain(ed)?|[Ii]nterpret|[Gg]uess|signify|denote|[Ee]xpress|convey|[Ii]ndicate|declare|involve|affirm|[Ss]tate|construed?|translate|infer(red)?|render|[Ss]olve|disentangled?|unravel(ed)?|[Cc]haracterized?|[Cc]larify?(ied)?|[Ee]xplain(ed)?|tells?/[A-Z]+ of|speaks?/[A-Z]+ of|points?/[A-Z]+ to|alludes?/[A-Z]+ to|drives?/[A-Z]+ at|makes?/[A-Z]+ out|accounts?/[A-Z]+ for|comments?/[A-Z]+ upon)/[A-Z]+} $keyLine24 { #KEYS_INTERPRETATION} keyLine25]
incr situatedKeys $intKeys
if {$intKeys >= 1} {
    lappend keyList [list INTERPRETATION]
}
# __EXPECTATIONAL__
set expKeys [regsub -all { HAPPEN_E} $keyLine25 { #KEYS_EXPECTATIONAL} keyLine26]
incr situatedKeys $expKeys
if {$expKeys >= 1} {
    lappend keyList [list EXPECTATIONAL]
}


#----------------------
# Syntactic component
#----------------------

# TRANSFORM INPUT TO BIBER NOTATION
set fline68 [biberSub $keyLine26]

#--------------------------------------------
# DECIDE TYPE: QUESTION, ASSERTION, DIRECTIVE
#--------------------------------------------

if { [regexp {(^[ ]?(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP|MODAL|DO|HAVE|BE|SHOULD|#KEYS_JUDGEMENTAL|WOULD|WHICH).*$|QUESTION_MARK)} $fline68 match]!=1} {
    if { [regexp {^[ ]?(VBD|VBG|VBN|VBP|VBZ|VB)} $fline68 match]} {
	set type "DIRECTIVE"
    } else {
	set type "ASSERTION"
    }
} else { 
    set type "QUESTION"
}
 
# TRANSFORM ALL NON-QUESTION TYPES TO QUESTIONS
    
if { [regexp {^[ ]?(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP|MODAL|DO|HAVE|BE|SHOULD|#KEYS_JUDGEMENTAL|WOULD|WHICH).*$} $fline68 match]!=1} {
    if { [regexp {(WHO|WHO_|WHAT|HOW|WHY|WHERE|WHEN|WHP)} $fline68 match]} {
	set fline68 "$match $fline68"
    } elseif { [regexp {(MODAL|DO|HAVE|BE)} $fline68 match]} {
	set fline68 "$match $fline68"
    } else { 
	regsub {^[ ]*} $fline68 {} newline
	set fline68 "DO $newline"
    }
} 

# MATCH CLASS SYNTACTIC PATTERNS TO LINE

	#68 __verification__
	if {[regsub -all {^[ ]?(MODAL|WOULD|SHOULD|DO|HAVE|BE)} $fline68 {VERIFICATION} ignore] >= 1} {
	    lappend classList [list VERIFICATION]
	}
	#69 __definition__
	if {[regsub -all {(^[ ]?WHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)([^#]*#?[^#]*#KEYS_DEFINITION|[ ]?(A )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP))|^ (MODAL|WOULD) YOU[^#]*#?[^#]*#KEYS_DEFINITION|WHAT (A )?(ADJ |ADV )*(NN[SP]?[S]?|[^/]+/NNP) BE)} $fline68 {DEFINITION} ignore] >= 1} {    
	    lappend classList [list DEFINITION]
	}
	#70 __disjunction__     
	if {[regsub -all {^[ ]?(MODAL|WOULD|SHOULD|DO|HAVE|BE)[^#]*#?[^#]*#KEYS_DISJUNCTION} $fline68 {DISJUNCTION} ignore] >= 1} {
	    lappend classList [list DISJUNCTION]
	}
	#71 __example__
	if {[regsub -all {^[ ]?(WHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?| (MODAL|WOULD|SHOULD|DO|HAVE|BE))[^#]*#?[^#]*#KEYS_EXAMPLE} $fline68 {EXAMPLE} ignore] >= 1} {
	    lappend classList [list EXAMPLE]
	}
	#72 __quantification__
	if {[regsub -all {(^[ ]?WHAT (MODAL|WOULD|SHOULD|DO|HAVE|BE)?[^#]*#?[^#]*#KEYS_QUANTIFICATION|^[ ]?HOW (QUAN|ADJ|ADV)|^ (WOULD|MODAL) YOU[^#]*#?[^#]*#KEYS_QUANTIFICATION)} $fline68 {QUANTIFICATION} ignore] >= 1} {
	    lappend classList [list QUANTIFICATION]
	}
	#73 __feature specification__
	if {[regsub -all {(^[ ]?WHAT[^#]*#?[^#]*#KEYS_FEATURESPEC|#KEYS_FEATURESPEC)} $fline68 {FEATURE_SPEC} ignore] >= 1} {
	    lappend classList [list FEATURE_SPECIFICATION]
	}
	#76 __concept completion__
	if {[regsub -all {^[ ]?(WHAT|WHO_|WHERE|WHEN|WHICH)} $fline68 {CONCEPT_COMP} ignore] >= 1} {
	    lappend classList [list CONCEPT_COMPLETION]
	}
    
	#74 __enablement__
	if {[regsub -all {^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*#KEYS_ENABLEMENT} $fline68 {ENABLEMENT} ignore] >= 1} {
	    lappend classList [list ENABLEMENT]
	}
	#82 __judgemental__
	if {[regsub -all {((YOU|YOUR) #KEYS_JUDGEMENTAL|(SHOULD|#KEYS_JUDGEMENTAL) (SUBJPRO|PRO|NN[SP]?[S]?))} $fline68 {JUDGEMENTAL} ignore] >= 1} {
	    lappend classList [list JUDGMENTAL]
	}
	#79 __expectational__
	if {[regsub -all {(^[ ]?WHY (HAVE|BE|DO)?[^#]*#?[^#]*NEG|MODAL #KEYS_CAUSALCONS #KEYS_CAUSALANTE)} $fline68 {EXPECTATIONAL} ignore] >= 1} {
	    lappend classList [list EXPECTATIONAL]
	}
	#75 __causal consequent__
	if {[regsub -all {^[ ]?(WHAT| DO)[^#]*#?[^#]*#KEYS_CAUSALCONS} $fline68 {CAUSAL_CONS} ignore] >= 1} {
	    lappend classList [list CAUSAL_CONSEQUENT]
	}  
	#77 __comparison__
	if {[regsub -all {((^[ ]?WHAT|^[ ]?(WHP|WHICH)) (BE|MODAL|WOULD|SHOULD)?[^#]*#?[^#]*#KEYS_COMPARISON|HOW[^#]*#?[^#]*#KEYS_COMPARISON|^ (MODAL|WOULD) YOU[^#]*#?[^#]*#KEYS_COMPARISON)} $fline68 {COMPARISON} ignore] >= 1} {
	    lappend classList [list COMPARISON]
	}
	#78 __instrumental__
	if {[regsub -all {(^[ ]?HOW (MODAL|WOULD|SHOULD|DO) ((ART )?NN[SP]?[S]?|YOU|SUBJPRO|PRO)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[^#]*#?[^#]*#KEYS_INSTRUMENTAL|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY) NN[SP]?[S]?[^#]*#?[^#]*#KEYS_INSTRUMENTAL|^ (MODAL|WOULD) YOU[^#]*#?[^#]*#KEYS_INSTRUMENTAL)} $fline68 {INSTRUMENTAL} ignore] >= 1} {
	    lappend classList [list INSTRUMENTAL]
	}
	#81 __goal orientation__
	if {[regsub -all {(^[ ]?WHY (DO|BE) (YOU|SUBJPRO|PRO|ART #KEYS_GOALORIENTATION|(ART )?NN[SP]?[S]?)|(^[ ]?WHAT|^[ ]?(WHP|WHICH))([^#]*#?[^#]*#KEYS_GOALORIENTATION|MODAL|WOULD|SHOULD PRO)|^[ ]?(WHAT|WHY) WOULD (ART |A )?(YOU|SUBJPRO|PRO|NN[SP]?[S]?))} $fline68 {GOAL_ORIENT} ignore] >= 1} {
	    lappend classList [list GOAL_ORIENTATION]
	}
	#80 __casual antecedent__
	if {[regsub -all {(^[ ]?(WHY|HOW) (DO|BE|MODAL|WOULD|SHOULD)[^#]*#?[^#]*(VBD?N?G?|#KEYS_CAUSALANTE)|^[ ]?(WHO|WHAT|HOW|WHO_|WHERE|WHEN|WHY)[ ]? #KEYS_CAUSALANTE)} $fline68 {CAUSAL_ANTE} ignore] >= 1} {
	    lappend classList [list CAUSAL_ANTECEDENT]
	}
	#83 __interpretation__
	if {[regsub -all {#KEYS_INTERPRETATION} $fline68 {INTERPRETATION} ignore] >= 1} {
	    lappend classList [list INTERPRETATION]
	}

#-----------------------------------
# Make final classification decision
#-----------------------------------

if {[llength $classList]>=2} {
    regsub -all {(verification|concept_completion)} $classList {} classList
}
if {[llength $classList]==0 && [llength $keyList]!=0} {
	set firstKey [lindex $keyList 0]
	lappend classList $firstKey
} elseif {[llength $classList]>=1 && [llength $keyList]!=0} {
    set this 0
    set that 0
    set halt [llength $classList]
    set times [llength $keyList]
    set thisKey [lindex $keyList 0]
    set keyClass [lindex $classList 0]
    while {[regexp "$keyClass" $thisKey match]==0 && $that!=$halt} {
	incr this
	if {$this==$times} {
	    set this 0
	    incr that
	}
	set thisKey [lindex $keyList $this]
	if {$that < $halt} {
	    set keyClass [lindex $classList $that]
	}
	set pairExists [regexp "$keyClass" $thisKey match]
    } 
    if {$that==$halt && $pairExists==0} {
	set keyClass [lindex $classList [expr $that-1]]
    }
    set classList $keyClass
} else {
    set notVorCC 0
    if {[llength $classList]>1 && ([lindex $classList 0]=="verification" || [lindex $classList 0]=="concept_completion")} {
	incr notVorCC
    }
    set keyClass [lindex $classList $notVorCC]
    set classList $keyClass
}

#puts stdout "keyList:   $keyList"
#puts stdout "classList: $classList"

if {$type=="ASSERTION"} {
    set qadResponse "Okay, interesting point. And now what?"
} elseif {$type=="QUESTION"} {
    set qadResponse ""
} else {
    set qadResponse "Hold on pal, you can ask that in a more friendly way!"
}
switch -exact $classList {
    VERIFICATION {set qResponse "If you are thinking yes then it is probably no"}
    COMPARISON {set qResponse "Comparing this with that, differences, similarities. You are asking a lot from me."}
    DISJUNCTION {set qResponse "Why is it either ... or? Why no just and ... and? Everybody wins!"}
    CONCEPT_COMPLETION {set qResponse "This is a difficult one. Since I prefer to give long answers, you might want to rephrase the question."}
    DEFINITION {set qResponse "Sorry, I am not a dictionary! I am just a computational tutor!"}
    EXAMPLE {set qResponse "I'm going to have to look in my database of examples. Please wait."}
    INTERPRETATION {set qResponse "Why are you asking my opinion when you already have one?"}
    FEATURE_SPECIFICATION {set qResponse "How can I describe how things look, sound, or taste when I'm just a computer tutor?"}
    QUANTIFICATION {set qResponse "Gosh, you want me to quantify that? I don't know. I was never good at math."}
    CAUSAL_ANTECEDENT {set qResponse "Good question. I often wonder what actually caused it..."}
    CAUSAL_CONSEQUENT {set qResponse "Yes, what happens ... I need to think about the consequences."}
    GOAL_ORIENTATION {set qResponse "Each human being has different motives and goals. That's the advantage of being a computational tutor!"}
    ENABLEMENT {set qResponse "Good question. Yes, what is actually needed?"}
    INSTRUMENTAL {set qResponse "Yes, the biggest unanswered question is: how?"}
    EXPECTATIONAL {set qResponse "Good question . . . Yes, why didn't this occur?"}
    JUDGMENTAL {set qResponse "So you want to have my computational judgment on this?"}
}
} else { 
    if {$type=="FROZEN_ASSERTION"} {
	set qadResponse "Let me see if I can say it in a different way"
    } elseif {$type=="FROZEN_QUESTION"} {
	set qadResponse "Please pay close attention and I will try to answer your question"
    } else {
	set qadResponse "I will repeat that for you"
    }
    set qResponse {}
} 


#puts stdout "Expression is  $type  handle as  $classList \n  $qadResponse $qResponse"
puts stdout "$type\t$classList\t$oline"


