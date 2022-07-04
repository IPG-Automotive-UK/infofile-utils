# IPG Automotive Infofile Reader and Writer

JavaScript library for reading and writing IPG Automotive infofiles.

## Getting Started

Installation:

```
npm install --save @ipguk/infofile-reader-and-writer
```

Importing the library:

```
const infofile = require("@ipguk/infofile-reader-and-writer");
```

## Usage

### Getting values from an infofile:

<details>
<summary>getDouble</summary>
Returns a double value from an infofile for a given key or an array of keys.

### Getting a single double value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile


// get the double value for the key "WheelCarrier.fl.mass"
const wheelCarrierValue = infofile.getDouble({infofilePath, key:"WheelCarrier.fl.mass"});

// console.log the value, returns a double e.g. "0.5"
console.log(wheelCarrierValue)
```

### Getting an array of double values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the double values for the keys "WheelCarrier.fl.mass" and "WheelCarrier.fr.mass"
const wheelCarrierValues = infofile.getDouble({infofilePath, key:["WheelCarrier.fl.mass", "WheelCarrier.fr.mass"]});

// console.log the values, returns an array of objects with the keys "key" and "value" e.g. [{key: "WheelCarrier.fl.mass", value: 0.5}, {key: "WheelCarrier.fr.mass", value: 0.5}]
console.log(wheelCarrierValues)
```

</details>

<details>
<summary>getKeyValues</summary>
A universal function for getting values from an infofile. All numerical values are returned as doubles. All other values are returned as strings.

### Getting a single value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the value for the key "WheelCarrier.fl.mass"
const wheelCarrierValue = infofile.getKeyValues({infofilePath, key:"WheelCarrier.fl.mass"});

// console.log the value (returns an object like this {key: "WheelCarrier.fl.mass", value: 0.0})
console.log(wheelCarrierValue)
```

### Getting an array of values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the values for the keys "WheelCarrier.fl.mass" and "SuspF.Spring.Kind"
const values = infofile.getKeyValues({infofilePath, key:["WheelCarrier.fl.mass", "SuspF.Spring.Kind"]});

// console.log the values (returns an array of objects like this [{key: "WheelCarrier.fl.mass", value: 0.0}, {key: "SuspF.Spring.Kind", value: "Hookean 1"}])
console.log(values)
```

</details>

<details>
<summary>getLong</summary>
Returns a long value from an infofile for a given key or an array of keys.

### Getting a single long value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the long value for the key "Body.mass"
const bodyMassValue = infofile.getLong({infofilePath, key:"Body.mass"});

// console.log the value, returns a long e.g. 1801
console.log(bodyMassValue)
```

### Getting an array of long values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the long values for the keys "Body.mass" and "nAxle"
const longValues = infofile.getLong({infofilePath, key:["Body.mass", "nAxle"]});

// console.log the values, returns an array of objects with the keys "key" and "value" e.g. [{key: "Body.mass", value: 1801}, {key: "nAxle", value: 2}]
console.log(longValues)
```

</details>

<details>
<summary>getString</summary>
Returns a string value from an infofile for a given key or an array of keys.

### Getting a single string value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the string value for the key "Aero.Crosswind.Kind"
const aeroCrosswindKind = infofile.getString({infofilePath, key:"Aero.Crosswind.Kind"});

// console.log the value, returns a string e.g. "Step"
console.log(aeroCrosswindKind)
```

### Getting an array of string values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the string values for the keys "Body.mass" and "Aero.Kind"
const stringValues = infofile.getString({infofilePath, key:["Aero.Crosswind.Kind", "Aero.Kind"]});

// console.log the values, returns an array of objects with the keys "key" and "value" e.g. [{key: "Aero.Crosswind.Kind", value: "Step"}, {key: "Aero.Kind", value: "Coeff6x1 1"}]
console.log(stringValues)
```

</details>

<details>
<summary>getText</summary>
Returns a text value from an infofile for a given key or an array of keys. This is an array of strings are are split by newlines in the infofile.

### Getting a single text value from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the text value for the key "Description"
const description = infofile.getText({infofilePath, key:"Description"});

// console.log the value, returns an array of strings e.g. ["This is a description", "of the infofile"]
console.log(description)
```

### Getting an array of text values from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the text values for the keys "Description" and "Aero.Coeff"
const textValues = infofile.getText({infofilePath, key:["Description", "Aero.Coeff"]});

// console.log the values, returns an array of objects with the keys "key" and "value" e.g. [{key: "Description", value: ["-180 -0.4 0.0 0.1 0.0 -0.01 0.0","-120 -0.2 -1.4 0.7 -0.2 -0.021 0.06","-90 0.0 -1.7 0.9 -0.2 0.0 0.0","-60 0.0 -1.7 0.9 -0.2 0.0 0.0","-30 0.0 -1.7 0.9 -0.2 0.0 0.0","0.0 0.0 -1.7 0.9 -0.2 0.0 0.0","30 0.0 -1.7 0.9 -0.2 0.0 0.0","60 0.0 -1.7 0.9 -0.2 0.0 0.0","90 0.0 -1.7 0.9 -0.2 0.0 0.0","120 0.0 -1.7 0.9 -0.2 0.0 0.0","180 0.0 -1.7 0.9 -0.2 0.0 0.0"]}]
console.log(textValues)
```

</details>

### Setting values to a infofile:

<details>
<summary>setDouble</summary>
Sets a double value to an infofile for a given key.

### Setting a single double value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the double value for the key "SuspF.Spring.l0" to 0.351
status = infofile.setDouble({infofilePath, keyValues:{key: "SuspF.Spring.l0", value: 0.351}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of double values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the double values for the keys "SuspF.Spring.l0" and "Body.mass" to 0.351 and 1830.15
status = infofile.setDouble({infofilePath, keyValues:[{key: SuspF.Spring.l0", value: 0.351}, {key: "Body.mass", value:  1830.15}]});

// console.log the status, array of objects with the keys "key" and "status" e.g. [{key: "SuspF.Spring.l0", status: 0}, {key: "Body.mass", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary>setKeys</summary>
A universal function to set values to an infofile.

### Setting a single value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the value for the key "SuspF.Spring.l0" to 0.351
status = infofile.setKeys({infofilePath, setKeyValues:{key: "SuspF.Spring.l0", value: 0.351, type: "double"}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the values for the keys "SuspF.Spring.l0" and "Aero.Crosswind.Kind" to 0.351 and "Step"
status = infofile.setKeys({infofilePath, setKeyValues:[{key: "SuspF.Spring.l0", value: 0.351, type: "double"}, {key: "Aero.Crosswind.Kind", value:  "Step", type: "string"}]});

// console.log the status, array of objects with the keys "key" and "status" e.g. [{key: "SuspF.Spring.l0", status: 0}, {key: "Aero.Crosswind.Kind", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary>setLong</summary>
Sets a long value to an infofile for a given key.

### Setting a single long value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the long value for the key "Body.mass" to 1801
status = infofile.setLong({infofilePath, keyValues:{key: "Body.mass", value: 1801}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of long values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the long values for the keys "Body.mass" and "nAxle" to 1801 and 2
status = infofile.setLong({infofilePath, keyValues:[{key: "Body.mass", value: 1801}, {key: "nAxle", value: 2}]});

// console.log the status, array of objects with the keys "key" and "status" e.g. [{key: "Body.mass", status: 0}, {key: "nAxle", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary>setString</summary>
Sets a string value to an infofile for a given key.

### Setting a single string value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the string value for the key "Aero.Crosswind.Kind" to "Step"
status = infofile.setString({infofilePath, keyValues:{key: "Aero.Crosswind.Kind", value: "Step"}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of string values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the string values for the keys "Aero.Crosswind.Kind" and "Eng.Kind" to "Step" and "Flex"
status = infofile.setString({infofilePath, keyValues:[{key: "Aero.Crosswind.Kind", value: "Step"}, {key: "Eng.Kind", value: "Flex"}]});

// console.log the status, array of objects with the keys "key" and "status" e.g. [{key: "Aero.Crosswind.Kind", status: 0}, {key: "Eng.Kind", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

<details>
<summary>setText</summary>
Sets a text value to an infofile for a given key. This is an array of strings are are split by newlines in the infofile for each item in the string array.

### Setting a single text value to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the text value for the key "Description" to ["This is a description", "This is a description on a second line"]
status = infofile.setText({infofilePath, keyValues:{key: "Description", value: ["This is a description", "This is a description on a second line"]}});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Setting an array of text values to an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// set the text values for the keys "Description" and "Eng.Description" to ["This is a description", "This is a description on a second line"] and ["This is a description", "This is a description on a second line"]
status = infofile.setText({infofilePath, keyValues:[{key: "Description", value: ["This is a description", "This is a description on a second line"]}, {key: "Eng.Description", value: ["This is a description", "This is a description on a second line"]}]});

// console.log the status, array of objects with the keys "key" and "status" e.g. [{key: "Description", status: 0}, {key: "Eng.Description", status: 0}] where status is 0 if successful, -1 if not
console.log(status)
```

</details>

### Other functions

<details>
<summary>listKeys</summary>
Lists the keys in an infofile, for a given prefix, if no prefix is provided all keys are returned

### Listing all keys in an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// list all keys in the infofile
keys = infofile.listKeys({infofilePath});

// console.log the keys, returns an array of keys e.g. ["Body.mass", "nAxle"]
console.log(keys)
```

### Listing keys in an infofile for a given prefix:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// list all keys in the infofile for the prefix "Aero"
keys = infofile.listKeys({ infofilePath, keyPrefix: "Aero" });

// console.log the keys, returns an array of keys e.g. ["Aero.Crosswind.Kind", "Aero.Crosswind.Speed"]
console.log(keys)
```

</details>

<details>
<summary>keyKinds</summary>
Lists the keyKinds, returns String_Key, Text_Key or No_Key

### Get the keyKinds for a single key:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the keyKinds for the key "Body.mass"
keyKind = infofile.keyKinds({infofilePath, key: "Body.mass"});

// console.log the keyKind, returns String_Key if key is a single line string, Text_Key if key is a text array and No_Key if key is not found
console.log(keyKind)
```

### Get the keyKinds for a list of keys:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// get the keyKinds for the keys "Body.mass" and "nAxle"
keyKinds = infofile.keyKinds({infofilePath, keys: ["Body.mass", "nAxle"]});

// console.log the keyKinds, returns an array of keyKinds e.g. ["String_Key", "No_Key"]
console.log(keyKinds)
```

</details>

<details>
<summary>deleteKey</summary>
Deletes a key from an infofile

### Delete a single key from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// delete the key "Body.mass"
status = infofile.deleteKey({infofilePath, key: "Body.mass"});

// console.log the status, returns 0 if successful, -1 if not
console.log(status)
```

### Delete a list of keys from an infofile:

```
// import the library
const infofile = require("@ipguk/infofile-reader-and-writer");

// get the absolute path to the infofile
const infofilePath = C:\infofiles\infofile

// delete the keys "Body.mass" and "nAxle"
status = infofile.deleteKey({infofilePath, keys: ["Body.mass", "nAxle"]});

// console.log the status, returns an object with the keys "key" and "status" e.g. {key: "Body.mass", status: 0}, {key: "nAxle", status: 0} where status is 0 if successful, -1 if not
console.log(status)
```

</details>
