let util = require('gulp-util');
let config = {
  dev: !util.env.prod
};

module.exports = {
  pugJs: {
    filters: {
      uglifyJs: {
        // toplevel: true,
        // compress: {
        //     global_defs: {
        //         "@console.log": "alert"
        //     },
        //     passes: 2
        // },
        output: {
          beautify: config.dev
          // preamble: "/* uglified */"
        }
      },
      scss: {
        indentType: "tab",
        indentWidth: 1,
        outputStyle: config.dev ? "expanded" : "compressed"
      }
    }
  }
};
//=======================NODE-SASS CLI OPTIONS=================================================//
//    -w, --watch               | Watch a directory or file                                    //
//    -r, --recursive           | Recursively watch directories or files                       //
//    -o, --output              | Output directory                                             //
//    -x, --omit-source-map-url | Omit source map URL comment from output                      //
//    -i, --indented-syntax     | Treat data from stdin as sass code (versus scss)             //
//    -q, --quiet               | Suppress log output except on error                          //
//    -v, --version             | Prints version info                                          //
//    --output-style            | CSS output style (nested | expanded | compact | compressed)  //
//    --indent-type             | Indent type for output CSS (space | tab)                     //
//    --indent-width            | Indent width; number of spaces or tabs (maximum value: 10)   //
//    --linefeed                | Linefeed style (cr | crlf | lf | lfcr)                       //
//    --source-comments         | Include debug info in output                                 //
//    --source-map              | Emit source map                                              //
//    --source-map-contents     | Embed include contents in map                                //
//    --source-map-embed        | Embed sourceMappingUrl as data URI                           //
//    --source-map-root         | Base path, will be emitted in source-map as is               //
//    --include-path            | Path to look for imported files                              //
//    --follow                  | Follow symlinked directories                                 //
//    --precision               | The amount of precision allowed in decimal numbers           //
//    --error-bell              | Output a bell character on errors                            //
//    --importer                | Path to .js file containing custom importer                  //
//    --functions               | Path to .js file containing custom functions                 //
//    --help                    | Print usage info                                             //
//=============================================================================================//

//============================UGLIFY-JS CLI OPTIONS============================================//
//    -h, --help                  | Print usage information.                                   //
//                                | `--help options` for details on available options.         //
//    -V, --version               | Print version number.                                      //
//    -p, --parse <options>       | Specify parser options:                                    //
//                                | `acorn`  Use Acorn for parsing.                            //
//                                | `bare_returns`  Allow return outside of functions.         //
//                                |                 Useful when minifying CommonJS             //
//                                |                 modules and Userscripts that may           //
//                                |                 be anonymous function wrapped (IIFE)       //
//                                |                 by the .user.js engine `caller`.           //
//                                | `expression`  Parse a single expression, rather than       //
//                                |               a program (for parsing JSON).                //
//                                | `spidermonkey`  Assume input files are SpiderMonkey        //
//                                |                 AST format (as JSON).                      //
//    -c, --compress [options]    | Enable compressor/specify compressor options:              //
//                                | `pure_funcs`  List of functions that can be safely         //
//                                |               removed when their return values are         //
//                                |               not used.                                    //
//    -m, --mangle [options]      | Mangle names/specify mangler options:                      //
//                                | `reserved`  List of names that should not be mangled.      //
//    --mangle-props [options]    | Mangle properties/specify mangler options:                 //
//                                | `builtins`  Mangle property names that overlaps            //
//                                |             with standard JavaScript globals.              //
//                                | `debug`  Add debug prefix and suffix.                      //
//                                | `domprops`  Mangle property names that overlaps            //
//                                |             with DOM properties.                           //
//                                | `keep_quoted`  Only mangle unquoted properies.             //
//                                | `regex`  Only mangle matched property names.               //
//                                | `reserved`  List of names that should not be mangled.      //
//    -b, --beautify [options]    | Beautify output/specify output options:                    //
//                                | `beautify`  Enabled with `--beautify` by default.          //
//                                | `preamble`  Preamble to prepend to the output. You         //
//                                |             can use this to insert a comment, for          //
//                                |             example for licensing information.             //
//                                |             This will not be parsed, but the source        //
//                                |             map will adjust for its presence.              //
//                                | `quote_style`  Quote style:                                //
//                                |                0 - auto                                    //
//                                |                1 - single                                  //
//                                |                2 - double                                  //
//                                |                3 - original                                //
//                                | `wrap_iife`  Wrap IIFEs in parenthesis. Note: you may      //
//                                |              want to disable `negate_iife` under           //
//                                |              compressor options.                           //
//    -o, --output <file>         | Output file path (default STDOUT). Specify `ast` or        //
//                                | `spidermonkey` to write UglifyJS or SpiderMonkey AST       //
//                                | as JSON to STDOUT respectively.                            //
//    --comments [filter]         | Preserve copyright comments in the output. By              //
//                                | default this works like Google Closure, keeping            //
//                                | JSDoc-style comments that contain "@license" or            //
//                                | "@preserve". You can optionally pass one of the            //
//                                | following arguments to this flag:                          //
//                                | - "all" to keep all comments                               //
//                                | - a valid JS RegExp like `/foo/` or `/^!/` to              //
//                                | keep only matching comments.                               //
//                                | Note that currently not *all* comments can be              //
//                                | kept when compression is on, because of dead               //
//                                | code removal or cascading statements into                  //
//                                | sequences.                                                 //
//    --config-file <file>        | Read `minify()` options from JSON file.                    //
//    -d, --define <expr>[=value] | Global definitions.                                        //
//    --ie8                       | Support non-standard Internet Explorer 8.                  //
//                                | Equivalent to setting `ie8: true` in `minify()`            //
//                                | for `compress`, `mangle` and `output` options.             //
//                                | By default UglifyJS will not try to be IE-proof.           //
//    --keep-fnames               | Do not mangle/drop function names.  Useful for             //
//                                | code relying on Function.prototype.name.                   //
//    --name-cache <file>         | File to hold mangled name mappings.                        //
//    --self                      | Build UglifyJS as a library (implies --wrap UglifyJS)      //
//    --source-map [options]      | Enable source map/specify source map options:              //
//                                | `base`  Path to compute relative paths from input files.   //
//                                | `content`  Input source map, useful if you're compressing  //
//                                |            JS that was generated from some other original  //
//                                |            code. Specify "inline" if the source map is     //
//                                |            included within the sources.                    //
//                                | `filename`  Name and/or location of the output source.     //
//                                | `includeSources`  Pass this flag if you want to include    //
//                                |                   the content of source files in the       //
//                                |                   source map as sourcesContent property.   //
//                                | `root`  Path to the original source to be included in      //
//                                |         the source map.                                    //
//                                | `url`  If specified, path to the source map to append in   //
//                                |        `//# sourceMappingURL`.                             //
//    --timings                   | Display operations run time on STDERR.                     //
//    --toplevel                  | Compress and/or mangle variables in top level scope.       //
//    --verbose                   | Print diagnostic messages.                                 //
//    --warn                      | Print warning messages.                                    //
//    --wrap <name>               | Embed everything in a big function, making the             //
//                                | “exports” and “global” variables available. You            //
//                                | need to pass an argument to this option to                 //
//                                | specify the name that your module will take                //
//                                | when included in, say, a browser.                          //
//=============================================================================================//
