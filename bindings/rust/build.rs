fn main() {
    let src_dir = std::path::Path::new("src");

    let mut c_config = cc::Build::new();
    c_config.include(src_dir);
    c_config
        .flag_if_supported("-Wno-unused-parameter")
        .flag_if_supported("-Wno-unused-but-set-variable")
        .flag_if_supported("-Wno-trigraphs");

    let parser_path = src_dir.join("parser.c");
    c_config.file(&parser_path);

    // If your language uses an external scanner written in C++,
    // then include this block of code:
    /*
    let scanner_path = src_dir.join("scanner.cc");
    c_config.file(&scanner_path);
    c_config.cpp(true);
    */

    c_config.compile("tree-sitter-bat");
    println!("cargo:rerun-if-changed={}", parser_path.display());

    // If your language uses an external scanner written in C++,
    // then include this block of code:
    /*
    println!("cargo:rerun-if-changed={}", scanner_path.display());
    */
}
