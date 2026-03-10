{
  "targets": [
    {
      "target_name": "tree_sitter_bat_binding",
      "include_dirs": [
        "src",
        "<!(node -e \"require('node-addon-api')\")"
      ],
      "sources": [
        "src/parser.c",
        "bindings/node/binding.cc"
      ],
      "cflags_c": [
        "-std=c11"
      ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": ["/utf-8"]
            }
          }
        }]
      ],
      "defines": [
        "NAPI_CPP_EXCEPTIONS"
      ]
    }
  ]
}
