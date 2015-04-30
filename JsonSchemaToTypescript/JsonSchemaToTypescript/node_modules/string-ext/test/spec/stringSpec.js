require("../../index");

describe("String.prototype", function(){

    describe("endsWith()", function(){
        it("should return true if the string ends in the specified substring", function(){
            expect("strings.js".endsWith("s")).toBeTruthy();
            expect("strings2".endsWith("2")).toBeTruthy();
        });


        it("should return false if the string does not ends with the specified substring", function(){
            expect("strings.js".endsWith("f")).toBeFalsy();
        });

        it("should throw an error if the argument is not a string", function(){
            function testError(value){
                try {
                    "strings2".endsWith(value);
                    fail("An error was not thrown.");
                } catch (e) {
                    // Do nothing
                }
            }

            testError(2);
            testError({});
            testError([]);
            testError(null);
        });

        it("should support substrings containing more than one character (e.g., \".js\")", function(){
            expect("strings.js".endsWith(".js")).toBeTruthy();
            expect("strings.js".endsWith("js")).toBeTruthy();
            expect("strings.js".endsWith("trings.js")).toBeTruthy();
            expect("strings.js".endsWith("tring.js")).toBeFalsy();
        });
    });


    describe("startsWith()", function(){
        it("should return true if the string starts with the specified substring", function(){
            expect("strings.js".startsWith("s")).toBeTruthy();
            expect("2strings".startsWith("2")).toBeTruthy();
        });

        it("should return false if the string does not start with the specified substring", function(){
            expect("strings.js".startsWith("f")).toBeFalsy();
        });

        it("should throw an error if the argument is not a string", function(){
            function testError(value){
                try {
                    "strings2".startsWith(value);
                    fail("An error was not thrown.");
                } catch (e) {
                    // Do nothing;
                }
            }

            testError(2);
            testError({});
            testError([]);
            testError(null);
        });

        it("should support substrings containing more than one character (e.g., \"str\")", function(){
            expect("strings.js".startsWith("str"));
        });
    });


    describe("trim()", function(){
        it("should trim the whitespace from both sides of a string", function(){
            expect("  ".trim()).toEqual("");
            expect("".trim()).toEqual("");
            expect("jgkfdl".trim()).toEqual("jgkfdl");
            expect("   jgkfdl".trim()).toEqual("jgkfdl");
            expect("   jgkfdl   ".trim()).toEqual("jgkfdl");
            expect("jgkfdl   ".trim()).toEqual("jgkfdl");
        });
    });

    describe("trimLeft()", function(){
        it("should trim the whitespace from the left side of a string", function(){
            expect("  ".trimLeft()).toEqual("");
            expect("".trimLeft()).toEqual("");
            expect("jgkfdl".trimLeft()).toEqual("jgkfdl");
            expect("   jgkfdl".trimLeft()).toEqual("jgkfdl");
            expect("   jgkfdl   ".trimLeft()).toEqual("jgkfdl   ");
            expect("jgkfdl   ".trimLeft()).toEqual("jgkfdl   ");
        });
    });

    describe("trimRight()", function(){
        it("should trim the whitespace from the right of a string", function(){
            expect("  ".trimRight()).toEqual("");
            expect("".trimRight()).toEqual("");
            expect("jgkfdl".trimRight()).toEqual("jgkfdl");
            expect("   jgkfdl".trimRight()).toEqual("   jgkfdl");
            expect("   jgkfdl   ".trimRight()).toEqual("   jgkfdl");
            expect("jgkfdl   ".trimRight()).toEqual("jgkfdl");
        });
    });

    describe("capitalize()", function(){
        it ("should capitalize only the first letter of the string", function(){
            expect("porshe".capitalize()).toEqual("Porshe");
            expect("porshe".capitalize()).not.toEqual("porshe");
        });

        it ("should make all other letters lower case if they are uppercase", function(){
            expect("PORSHE".capitalize()).toEqual("Porshe");
        });
    });


    describe("uncapitalize()", function(){
        it ("should uncapitalize only the first letter of the string", function(){
            expect("Porshe".uncapitalize()).toEqual("porshe");
            expect("pORSHE".uncapitalize()).not.toEqual("porshe");
        });
    });


    describe("format()", function(){
        it ("should replace the /{.+}/ in the string if the contents of {} match a property name of the argument", function(){
            var pattern = "The {team} will win the {contest} in the {season} season.";
            expect(pattern.format( { team: 'Dallas Cowboys', contest: 'Super Bowl', season: '2010-11'} )).toEqual("The Dallas Cowboys will win the Super Bowl in the 2010-11 season.");
            expect(pattern.format({ team: 'Texas Rangers', contest: 'World Series', season: 2010})).toEqual("The Texas Rangers will win the World Series in the 2010 season.");
            try {
                expect("No replacements found".format({ team: 'Texas Rangers', contest: 'World Series', season: 2010})).toEqual("No replacements found");
            } catch (e) {
                this.fail("A pattern without parameters should not throw an error.");
            }

            var pattern2 = "Ar{second}a virumq{third}{fourth}cano, {first}rojiae que primus ob {beforeFirst}";
            var expected = "Arma virumque cano, Trojiae que primus ob oris";
            expect(pattern2.format({beforeFirst: 'oris', first: 'T', second: 'm', third: 'ue', fourth: ' ', fifth: 'ghjkfdslg'})).toEqual(expected);
        });
    });

    describe("toCamelCase()", function(){
        it ("will return one camel case identifier from a multi-word string", function(){
            expect("RFI Responder".toCamelCase()).toEqual("rfiResponder");
            expect("The Dallas Cowboys will win the Super Bowl in the 2010-11 season.".toCamelCase()).toEqual("theDallasCowboysWillWinTheSuperBowlInThe2010-11Season.");
        });

        it("will return one lowercase string (same content, different string) if the string has only one word", function(){
            expect("ryryryryr".toCamelCase()).toEqual("ryryryryr");
            expect("01289".toCamelCase()).toEqual("01289");
            expect("- 12345".toCamelCase()).toEqual("-12345");
            expect("TExaS".toCamelCase()).toEqual("texas");
        });

        it("will return an empty if the current string is empty", function(){
            expect("".toCamelCase()).toEqual("");
        });
    });


    describe("contains()", function(){
        var s = "The Dallas Cowboys will win the Super Bowl in the 2010-11 season.";

        it("should return true if the specified string can be found in the current string", function(){
            expect(s.contains("Dallas")).toBeTruthy();
            expect(s.contains("alla")).toBeTruthy();
            expect(s.contains("in")).toBeTruthy();
            expect(s.contains("Super Bowl")).toBeTruthy();
            expect(s.contains("Super ")).toBeTruthy();
            expect(s.contains("Super")).toBeTruthy();
            expect(s.contains(".")).toBeTruthy();
            expect(s.contains("The ")).toBeTruthy();
            expect(s.contains("010")).toBeTruthy();
            expect(s.contains("-")).toBeTruthy();
        });

        it("should return false if the specified string can't be found in the current string", function(){
            expect(s.contains("on!")).toBeFalsy();
            expect(s.contains("Supers")).toBeFalsy();
            expect(s.contains(" .")).toBeFalsy();
            expect(s.contains("utirot")).toBeFalsy();
        });

        it("should be case-sensitive", function(){
            expect(s.contains("dallas")).toBeFalsy();
        });
    });


    describe("equalsIgnoreCase()", function(){
        it("will return true if String contents are equal regardless of case", function(){
            expect("Philip".equalsIgnoreCase("Philip")).toBeTruthy();
            expect("philip".equalsIgnoreCase("Philip")).toBeTruthy();
            expect("PhILip".equalsIgnoreCase("Philip")).toBeTruthy();
            expect("Philip".equalsIgnoreCase("philiP")).toBeTruthy();
        });

        it("will return false if String contents are unequal regardless of case", function(){
            expect("Philip".equalsIgnoreCase("hilip")).toBeFalsy();
            expect("hilip".equalsIgnoreCase("PHilip")).toBeFalsy();
            expect("hILip".equalsIgnoreCase("Philip")).toBeFalsy();
            expect("hiliP".equalsIgnoreCase("philiP")).toBeFalsy();
        });

        it("will handle multi-word strings correctly", function(){
            expect("Philip Ford".equalsIgnoreCase("philip ford")).toBeTruthy();
            expect("Philip Ford".equalsIgnoreCase("philip Ford")).toBeTruthy();
            expect("Philip Ford".equalsIgnoreCase("philip FORD")).toBeTruthy();
            expect("Philip Ford".equalsIgnoreCase("phiLip ford")).toBeTruthy();

            expect("Philip Anthony Ford".equalsIgnoreCase("phiLip anthony ford")).toBeTruthy();
            expect("Philip Anthony Ford".equalsIgnoreCase("phiLip Anthony ford")).toBeTruthy();
            expect("Philip Anthony Ford".equalsIgnoreCase("phiLip ANTHONY Ford")).toBeTruthy();
        });
    });


    describe("toBoolean()", function(){
        it ("should return true for \"true\"", function(){
            expect("true".toBoolean() === true).toBeTruthy();
            expect("true".toBoolean() === "true").toBeFalsy();
        });

        it ("should return false for \"false\"", function(){
            expect("false".toBoolean() === false).toBeTruthy();
            expect("false".toBoolean() === "false").toBeFalsy();
        });

        it ("should return the string if the string is neither \"true\" or \"false\"", function(){
            expect("{}".toBoolean() === false).toBeFalsy();
            expect("[]".toBoolean() === false).toBeFalsy();
            expect("".toBoolean() === false).toBeFalsy();
            expect("null".toBoolean() === false).toBeFalsy();
            expect("undefined".toBoolean() === false).toBeFalsy();
            expect("0".toBoolean() === false).toBeFalsy();

            expect("{}".toBoolean()).toEqual("{}");
            expect("[]".toBoolean()).toEqual("[]");
            expect("".toBoolean()).toEqual("");
            expect("null".toBoolean()).toEqual("null");
            expect("undefined".toBoolean()).toEqual("undefined");
            expect("0".toBoolean()).toEqual("0");
        });
    });


    describe("isEmpty()", function(){
        it ("should return true for an empty string", function(){
            expect("".isEmpty()).toBeTruthy();
            expect(new String().isEmpty()).toBeTruthy();
        });

        it ("should return true if the string contains only whitespace", function(){
            expect(" ".isEmpty()).toBeTruthy();
            expect("      ".isEmpty()).toBeTruthy();
            expect("   3".isEmpty()).toBeFalsy();
            expect("   3     ".isEmpty()).toBeFalsy();
            expect("3".isEmpty()).toBeFalsy();
            expect("3     ".isEmpty()).toBeFalsy();
        });
    });

    describe("notEmpty()", function(){
        it ("should return false for an empty string", function(){
            expect("".notEmpty()).toBeFalsy();
            expect(new String().notEmpty()).toBeFalsy();
        });

        it ("should return false if the string contains only whitespace", function(){
            expect(" ".notEmpty()).toBeFalsy();
            expect("      ".notEmpty()).toBeFalsy();
        });


        it ("should return true if the string contains anything other than whitespace", function(){
            expect("   3".notEmpty()).toBeTruthy();
            expect("   3     ".notEmpty()).toBeTruthy();
            expect("3".notEmpty()).toBeTruthy();
            expect("3     ".notEmpty()).toBeTruthy();
        });
    });


    describe("isUpperCase()", function(){
        it("should return true if every alphabetic character in the string is upper case", function(){
            expect("FIRST_NAME".isUpperCase()).toBeTruthy();
        });

        it("should return false if any alphabetic character in the string is lower case", function(){
            expect("FIRST_nAME".isUpperCase()).toBeFalsy();
            expect("something".isUpperCase()).toBeFalsy();
        });

        it("should be unaffected by non-alphabetic characters", function(){
            expect("FIRST2".isUpperCase()).toBeTruthy();
            expect("44566677".isUpperCase()).toBeTruthy();
            expect("*-".isUpperCase()).toBeTruthy();
        });
    });

    describe("justify(n)", function(){
        it("should add n spaces before the associated string", function(){
            expect("FIRST_NAME".justify(5)).toEqual("     FIRST_NAME");
            expect("FIRST_NAME".justify(0)).toEqual("FIRST_NAME");
            expect("FIRST_NAME".justify(-1)).toEqual("FIRST_NAME");
        });
    });


    describe("rightJustify(n)", function(){
        it("should add n spaces after the associated string", function(){
            expect("FIRST_NAME".rightJustify(5)).toEqual("FIRST_NAME     ");
            expect("FIRST_NAME".rightJustify(0)).toEqual("FIRST_NAME");
            expect("FIRST_NAME".rightJustify(-1)).toEqual("FIRST_NAME");
        });
    });

});