module.exports = grammar({
  name: "bat",

  extras: ($) => [/\s/, $.comment],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($._statement),

    shebang: ($) => seq("#!", /.*/),

    comment: ($) =>
      token(seq(choice("REM", "rem", "Rem", "@REM", "@rem"), /.*/)),

    _statement: ($) => choice($.label, $.command, $.variable_definition),

    // Label definition (e.g., :label_name)
    label: ($) =>
      prec.right(seq(":", field("name", $.identifier), optional(/\r?\n/))),

    // Variable definition (e.g., SET VAR=value)
    variable_definition: ($) =>
      prec.right(
        seq(
          optional("@"),
          field("command", choice("SET", "set", "Set")),
          optional($.set_options),
          field("name", $.identifier),
          "=",
          optional(field("value", $._variable_value)),
          optional(/\r?\n/),
        ),
      ),

    set_options: ($) => seq(/[A-Z]+\s+/i),

    _variable_value: ($) => choice($.string, $.identifier, $.number, $.path),

    // General command - handles all batch commands
    command: ($) =>
      prec.right(
        seq(
          optional("@"),
          field("name", $.command_name),
          repeat(field("argument", $._argument)),
          optional(/\r?\n/),
        ),
      ),

    command_name: ($) => $.identifier,

    _argument: ($) =>
      choice(
        $.string,
        $.variable,
        $.number,
        $.redirect_operator,
        $.pipe_operator,
        $.flag,
        $.path,
        $.identifier,
        $.parenthesized,
      ),

    string: ($) => seq('"', /[^"]*/, '"'),

    number: ($) => /\d+/,

    path: ($) => /[%~]?[A-Za-z]:\\[^\s"<>|]+/,

    flag: ($) => prec.left(seq("/", /[A-Za-z0-9]+/)),

    identifier: ($) => /[A-Za-z_][A-Za-z0-9_\-]*/,

    parenthesized: ($) => seq("(", repeat($._argument), ")"),

    // Variables
    variable: ($) =>
      choice(
        $.special_variable,
        $.parameter_variable,
        $.environment_variable,
        $.substring_variable,
        $.for_variable,
      ),

    special_variable: ($) =>
      seq(
        "%",
        choice(
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "*",
          "@",
          "DATE",
          "TIME",
          "CD",
          "PATH",
          "RANDOM",
          "ERRORLEVEL",
          "CMDEXTVERSION",
          "CMDCMDLINE",
          "PROCESSOR_ARCHITECTURE",
          "NUMBER_OF_PROCESSORS",
          "OS",
          "USERNAME",
          "USERDOMAIN",
          "COMPUTERNAME",
          "HOMEDRIVE",
          "HOMEPATH",
          "TEMP",
          "TMP",
          "SYSTEMROOT",
          "WINDIR",
          "PROGRAMFILES",
          "APPDATA",
        ),
        "%",
      ),

    parameter_variable: ($) => seq("%", /[0-9*]/, "%"),

    environment_variable: ($) => seq("%", $.identifier, "%"),

    substring_variable: ($) =>
      seq(
        "%",
        field("name", $.identifier),
        ":",
        optional(/~?[0-9\-]+/),
        optional(":"),
        optional(/~?[0-9\-]+/),
        "%",
      ),

    for_variable: ($) => seq("%%", $.identifier),

    // Redirect operators
    redirect_operator: ($) => choice(">", ">>", "2>", "2>>", ">&1", "<", "0<"),

    // Pipe operator
    pipe_operator: ($) => "|",
  },
});
