# Sushi

Sushi is a simple [Ant](http://ant.apache.org/) build intended to automate the packaging of Javascript code into [commonjs](http://wiki.commonjs.org/wiki/CommonJS) modules.

Specifically, it peforms 3 tasks:

1. Download JavaScript from a URL (and unpack if and archive)
2. Wrap the code to create a module definition
3. Apply further patches (such as defining the module identifier).

The build has been designed to run both directly or form part of a larger build.

## Usage

To use Sushi, simply import the `sushsi.xml` into your Ant `build.xml`.

Define the `package` task and add use the `<sushi />` element to add new targets.

    <?xml version="1.0" encoding="UTF-8"?>
    <project name="myApplication" default="all" basedir=".">
        
        <import file="/path/to/sushi.xml" />
        
        <target name="package">
            
            <sushi source="http://code.jquery.com/jquery-1.4.2.js" target="jquery.js" />
            
        </target>
    </project>

Simply run with `ant`.