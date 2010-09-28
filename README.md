# Sushi

Sushi is a simple [Ant](http://ant.apache.org/) build intended to automate the packaging of Javascript code into [commonjs](http://wiki.commonjs.org/wiki/CommonJS) compliant modules.

Specifically, it peforms 3 tasks:

1. Download JavaScript from a URL.
2. Wrap the code to create a module definition
3. Apply further patches (such as defining the module identifier).

The build has been designed to run both directly or form part of a larger build.

## Usage

To use Sushi, simply import the `sushi.xml` into your Ant `build.xml`.

Define the `package` task and add use the `<sushi />` element to add new targets.

    <?xml version="1.0" encoding="UTF-8"?>
    <project name="myApplication" default="all" basedir=".">
        
        <import file="/path/to/sushi.xml" />
        
        <target name="package">
            
            <sushi source="http://code.jquery.com/jquery-1.4.2.js" id="jquery-1.4" />
            
        </target>
    </project>

Simply run with `ant`.

After the build is complete, the packaged files are available in the `dist` directory.

The target directory that the packages are built to can be configured by specifying the `TARGET_DIR` property.

    ant -DTARGET_DIR=/some/other/path

Sushi has been tested with Ant 1.6.5 and 1.7.1. The single dependency, [Ant-Contrib](http://ant-contrib.sourceforge.net/), is bundled with Sushi.

## Todo

- Work out how to make the building from an archive process more generic
- Look at a better way to store the configuration of the build (which sources to load and so on).
- Consider making all build paths configurable (temp, templates etc)