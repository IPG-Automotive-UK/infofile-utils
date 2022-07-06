# IPG Automotive Infofile Utilities

JavaScript library for reading and writing IPG Automotive infofiles.

## Getting Started

Installation:

```
npm install --save @ipguk/infofile-utils
```

Importing the library:

```
const infofile = require("@ipguk/infofile-utils");
```

## Supported OS's

- Windows
- Linux

## Usage

### Getting values from an infofile:

<details>
<summary></b><code>getDouble</code></b></summary>
Returns a double value from an infofile for a given key or an array of keys. The value will be returned as a number.

### Getting a single double value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the double value for the keys "WheelCarrier.fl.mass"
const wheelCarrierValue = infofile.getDouble({file, keys:"WheelCarrier.fl.mass"});

// console.log the value, returns a double e.g. "0.5"
console.log(wheelCarrierValue)
```

### Getting an array of double values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the double values for the keys "WheelCarrier.fl.mass" and "WheelCarrier.fr.mass"
const wheelCarrierValues = infofile.getDouble({file, keys:["WheelCarrier.fl.mass", "WheelCarrier.fr.mass"]});

// console.log the values, returns an array of objects with the keys "keys" and "value" e.g. [{keys: "WheelCarrier.fl.mass", value: 0.5}, {keys: "WheelCarrier.fr.mass", value: 0.5}]
console.log(wheelCarrierValues)
```

</details>

<details>
<summary></b><code>getKeyValues</code></b></summary>
A universal function for getting values from an infofile. All numerical key values are returned as numbers. All other key values are returned as strings.

### Getting a single value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the value for the keys "WheelCarrier.fl.mass"
const wheelCarrierValue = infofile.getValue({file, keys:"WheelCarrier.fl.mass"});

// console.log the value (returns an object like this {keys: "WheelCarrier.fl.mass", value: 0.0})
console.log(wheelCarrierValue)
```

### Getting an array of values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the values for the keys "WheelCarrier.fl.mass" and "SuspF.Spring.Kind"
const values = infofile.getValue({file, keys:["WheelCarrier.fl.mass", "SuspF.Spring.Kind"]});

// console.log the values (returns an array of objects like this [{keys: "WheelCarrier.fl.mass", value: 0.0}, {keys: "SuspF.Spring.Kind", value: "Hookean 1"}])
console.log(values)
```

</details>

<details>
<summary></b><code>getLong</code></b></summary>
Returns a long value from an infofile for a given key or an array of keys. The value will be returned as a number.

### Getting a single long value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the long value for the keys "Body.mass"
const bodyMassValue = infofile.getLong({file, keys:"Body.mass"});

// console.log the value, returns a long e.g. 1801
console.log(bodyMassValue)
```

### Getting an array of long values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the long values for the keys "Body.mass" and "nAxle"
const longValues = infofile.getLong({file, keys:["Body.mass", "nAxle"]});

// console.log the values, returns an array of objects with the keys "keys" and "value" e.g. [{keys: "Body.mass", value: 1801}, {keys: "nAxle", value: 2}]
console.log(longValues)
```

</details>

<details>
<summary></b><code>getString</code></b></summary>
Returns a string value from an infofile for a given keys or an array of keys.

### Getting a single string value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the string value for the keys "Aero.Crosswind.Kind"
const aeroCrosswindKind = infofile.getString({file, keys:"Aero.Crosswind.Kind"});

// console.log the value, returns a string e.g. "Step"
console.log(aeroCrosswindKind)
```

### Getting an array of string values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the string values for the keys "Body.mass" and "Aero.Kind"
const stringValues = infofile.getString({file, keys:["Aero.Crosswind.Kind", "Aero.Kind"]});

// console.log the values, returns an array of objects with the keys "keys" and "value" e.g. [{keys: "Aero.Crosswind.Kind", value: "Step"}, {keys: "Aero.Kind", value: "Coeff6x1 1"}]
console.log(stringValues)
```

</details>

<details>
<summary></b><code>getText</code></b></summary>
Returns a text value from an infofile for a given keys or an array of keys. This is an array of strings are are split by newlines in the infofile.

### Getting a single text value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the text value for the keys "Description"
const description = infofile.getText({file, keys:"Description"});

// console.log the value, returns an array of strings e.g. ["This is a description", "of the infofile"]
console.log(description)
```

### Getting an array of text values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the text values for the keys "Description" and "Aero.Coeff"
const textValues = infofile.getText({file, keys:["Description", "Aero.Coeff"]});

// console.log the values, returns an array of objects with the keys "keys" and "value" e.g. [{keys: "Description", value: ["-180 -0.4 0.0 0.1 0.0 -0.01 0.0","-120 -0.2 -1.4 0.7 -0.2 -0.021 0.06","-90 0.0 -1.7 0.9 -0.2 0.0 0.0","-60 0.0 -1.7 0.9 -0.2 0.0 0.0","-30 0.0 -1.7 0.9 -0.2 0.0 0.0","0.0 0.0 -1.7 0.9 -0.2 0.0 0.0","30 0.0 -1.7 0.9 -0.2 0.0 0.0","60 0.0 -1.7 0.9 -0.2 0.0 0.0","90 0.0 -1.7 0.9 -0.2 0.0 0.0","120 0.0 -1.7 0.9 -0.2 0.0 0.0","180 0.0 -1.7 0.9 -0.2 0.0 0.0"]}]
console.log(textValues)
```

</details>

### Setting values to a infofile:

<details>
<summary></b><code>setDouble</code></b></summary>
Sets a double value to an infofile for a given keys.

### Setting a single double value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the double value for the keys "SuspF.Spring.l0" to 0.351
status = infofile.setDouble({file, values:{keys: "SuspF.Spring.l0", value: 0.351}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of double values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the double values for the keys "SuspF.Spring.l0" and "Body.mass" to 0.351 and 1830.15
status = infofile.setDouble({file, values:[{keys: SuspF.Spring.l0", value: 0.351}, {keys: "Body.mass", value:  1830.15}]});

// console.log the status, array of objects with the keys "keys" and "status" e.g. [{keys: "SuspF.Spring.l0", status: 0}, {keys: "Body.mass", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary></b><code>setValue</code></b></summary>
A universal function to set values to an infofile.

### Setting a single value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the value for the keys "SuspF.Spring.l0" to 0.351
status = infofile.setValue({file, values:{keys: "SuspF.Spring.l0", value: 0.351, type: "double"}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the values for the keys "SuspF.Spring.l0" and "Aero.Crosswind.Kind" to 0.351 and "Step"
status = infofile.setValue({file, values:[{keys: "SuspF.Spring.l0", value: 0.351, type: "double"}, {keys: "Aero.Crosswind.Kind", value:  "Step", type: "string"}]});

// console.log the status, array of objects with the keys "keys" and "status" e.g. [{keys: "SuspF.Spring.l0", status: 0}, {keys: "Aero.Crosswind.Kind", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary></b><code>setLong</code></b></summary>
Sets a long value to an infofile for a given keys.

### Setting a single long value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the long value for the keys "Body.mass" to 1801
status = infofile.setLong({file, values:{keys: "Body.mass", value: 1801}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of long values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the long values for the keys "Body.mass" and "nAxle" to 1801 and 2
status = infofile.setLong({file, values:[{keys: "Body.mass", value: 1801}, {keys: "nAxle", value: 2}]});

// console.log the status, array of objects with the keys "keys" and "status" e.g. [{keys: "Body.mass", status: 0}, {keys: "nAxle", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary></b><code>setString</code></b></summary>
Sets a string value to an infofile for a given keys.

### Setting a single string value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the string value for the keys "Aero.Crosswind.Kind" to "Step"
status = infofile.setString({file, values:{keys: "Aero.Crosswind.Kind", value: "Step"}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of string values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the string values for the keys "Aero.Crosswind.Kind" and "Eng.Kind" to "Step" and "Flex"
status = infofile.setString({file, values:[{keys: "Aero.Crosswind.Kind", value: "Step"}, {keys: "Eng.Kind", value: "Flex"}]});

// console.log the status, array of objects with the keys "keys" and "status" e.g. [{keys: "Aero.Crosswind.Kind", status: 0}, {keys: "Eng.Kind", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary></b><code>setText</code></b></summary>
Sets a text value to an infofile for a given keys. This is an array of strings are are split by newlines in the infofile for each item in the string array.

### Setting a single text value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the text value for the keys "Description" to ["This is a description", "This is a description on a second line"]
status = infofile.setText({file, values:{keys: "Description", value: ["This is a description", "This is a description on a second line"]}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of text values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// set the text values for the keys "Description" and "Eng.Description" to ["This is a description", "This is a description on a second line"] and ["This is a description", "This is a description on a second line"]
status = infofile.setText({file, values:[{keys: "Description", value: ["This is a description", "This is a description on a second line"]}, {keys: "Eng.Description", value: ["This is a description", "This is a description on a second line"]}]});

// console.log the status, array of objects with the keys "keys" and "status" e.g. [{keys: "Description", status: 0}, {keys: "Eng.Description", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

### Other functions

<details>
<summary></b><code>getKey</code></b></summary>
Lists the keys in an infofile, for a given prefix, if no prefix is provided all keys are returned

### Listing all keys in an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// list all keys in the infofile
keys = infofile.getKey({file});

// console.log the keys, returns an array of keys e.g. ["Body.mass", "nAxle"]
console.log(keys)
```

### Listing keys in an infofile for a given prefix:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// list all keys in the infofile for the prefix "Aero"
keys = infofile.getKey({ file, prefix: "Aero" });

// console.log the keys, returns an array of keys e.g. ["Aero.Crosswind.Kind", "Aero.Crosswind.Speed"]
console.log(keys)
```

</details>

<details>
<summary></b><code>getKeyKind</code></b></summary>
Lists the getKeyKind, returns String_Key, Text_Key or No_Key

### Get the getKeyKind for a single keys:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the getKeyKind for the keys "Body.mass"
keyKind = infofile.getKeyKind({file, keys: "Body.mass"});

// console.log the keyKind, returns String_Key if keys is a single line string, Text_Key if keys is a text array and No_Key if keys is not found
console.log(keyKind)
```

### Get the getKeyKind for a list of keys:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// get the getKeyKind for the keys "Body.mass" and "nAxle"
getKeyKind = infofile.getKeyKind({file, keys: ["Body.mass", "nAxle"]});

// console.log the getKeyKind, returns an array of getKeyKind e.g. ["String_Key", "No_Key"]
console.log(getKeyKind)
```

</details>

<details>
<summary></b><code>deleteKey</code></b></summary>
Deletes a keys from an infofile

### Delete a single keys from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// delete the keys "Body.mass"
status = infofile.deleteKey({file, keys: "Body.mass"});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Delete a list of keys from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-utils");

// get the absolute path to the infofile
const file = C:\infofiles\infofile

// delete the keys "Body.mass" and "nAxle"
status = infofile.deleteKey({file, keys: ["Body.mass", "nAxle"]});

// console.log the status, returns an object with the keys "keys" and "status" e.g. {keys: "Body.mass", status: 0}, {keys: "nAxle", status: 0} where status is 0 if successful, -1 if not
console.log(status)
```

</details>
