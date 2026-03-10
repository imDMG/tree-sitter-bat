use tree_sitter_language::LanguageFn;

extern "C" {
    fn tree_sitter_bat() -> *const ();
}

/// Get the tree-sitter [`LanguageFn`] for this grammar.
pub fn language() -> LanguageFn {
    unsafe { LanguageFn::from_raw(tree_sitter_bat) }
}

/// The content of the [`node-types.json`](../../src/node-types.json) file,
/// which can be useful for inspecting the syntax tree.
pub const NODE_TYPES: &str = include_str!("../../src/node-types.json");

/// The generated [`parser.c`](../../src/parser.c) file.
pub const PARSER: &str = include_str!("../../src/parser.c");

// Uncomment if you have generated a [`grammar.json`](../../src/grammar.json) file.
// pub const GRAMMAR: &str = include_str!("../../src/grammar.json");

#[cfg(test)]
mod tests {
    #[test]
    fn test_can_load_grammar() {
        let mut parser = tree_sitter::Parser::new();
        parser
            .set_language(&super::language().into())
            .expect("Error loading bat language");
    }
}
