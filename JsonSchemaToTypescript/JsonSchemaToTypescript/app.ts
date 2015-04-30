/// <reference path="Scripts/typings/node/node.d.ts" />
/// <reference path="Scripts/typings/node/stringext.d.ts" />
require('string-ext');
var path=require('path');
var fs = require('fs');
var sys = require("sys");
var minimist = require("minimist");

var schema = { "id": "EnvironmentsService.Api.Resources.Environment", "type": "object", "properties": { "Name": { "type": ["string", "null"] }, "RoleServers": { "id": "EnvironmentsService.Api.Resources.RoleServers[]", "type": ["array", "null"], "items": { "id": "EnvironmentsService.Api.Resources.RoleServers", "type": ["object", "null"], "properties": { "RoleName": { "type": ["string", "null"] }, "Servers": { "id": "System.String[]", "type": ["array", "null"], "items": { "type": ["string", "null"] } } }, "required": ["RoleName", "Servers"] } }, "Databases": { "id": "EnvironmentsService.Api.Resources.Database[]", "type": ["array", "null"], "items": { "id": "EnvironmentsService.Api.Resources.Database", "type": ["object", "null"], "properties": { "DatabaseInstanceEndpoint": { "type": ["string", "null"] }, "DatabaseRoleName": { "type": ["string", "null"] }, "DatabaseName": { "type": ["string", "null"] } }, "required": ["DatabaseInstanceEndpoint", "DatabaseRoleName", "DatabaseName"] } }, "States": { "id": "EnvironmentsService.Api.Resources.State[]", "type": ["array", "null"], "items": { "id": "EnvironmentsService.Api.Resources.State", "type": ["object", "null"], "properties": { "Name": { "type": ["string", "null"] }, "Description": { "type": ["string", "null"] }, "CreatedDateTime": { "type": "string" } }, "required": ["Name", "Description", "CreatedDateTime"] } }, "CurrentState": { "$ref": "EnvironmentsService.Api.Resources.State" }, "Status": { "type": ["string", "null"], "enum": ["Unknown", "CreationInProgress", "ChangeStateInProgres", "SyncInProgress", "Good", "PartiallyOperational", "Bad"] } }, "required": ["Name", "RoleServers", "Databases", "States", "CurrentState", "Status"] };

function generate(output: any, name: string, schemaInput: any) {
  if (schemaInput.type == "object" || schemaInput.type[0]=="object" )
  {
      var propertiesString = ""
      if (schemaInput.properties === undefined)
          return;

      for (var propertyName in schemaInput.properties)
      {
          
          var property = schemaInput.properties[propertyName];
          if (property === undefined){ continue; }

          if (property.type == "string" || (property.type != undefined && property.type[0] == "string")) {
              propertiesString = propertiesString+"\n  {propertyName}:string;".format({propertyName:propertyName}) ;
          }
          if (property.type == "array" || (property.type!=undefined && property.type[0] == "array")) {
              if (schemaInput.properties[propertyName].items.type[0] == "string") {
                  propertiesString = propertiesString + "\n  {propertyName}:string[];".format({ propertyName: propertyName });
              }
              else if (schemaInput.properties[propertyName].items.type[0] == "object") {
                  var nameParts = schemaInput.properties[propertyName].items.id.split(".");
                  var typeName = nameParts[nameParts.length - 1];
                  propertiesString = propertiesString+ "\n  {propertyName}:{typeName}[];".format({ propertyName: propertyName,typeName:typeName });
              
                  generate(output, typeName , schemaInput.properties[propertyName].items);
              }
          }
          
      }
      output[name] = "\n\nexport interface {className} {{properties}\n}".format({ className: name, properties:propertiesString });
  }
}

var args = {};
if (sys.args != undefined)
{
    args= minimist(sys.args, {});
}
var targetFileFullName = args.targetFileFullName;
if (targetFileFullName == null) {
    targetFileFullName=path.resolve(__dirname, "out.d.ts");
}
var output = {};
generate(output, "Environment", schema);
var fileOptions = { encoding: 'utf-8' };
fs.writeFileSync(targetFileFullName, "//auto-generated", fileOptions);
for (var propertyName in output) {
    fs.appendFileSync(targetFileFullName, output[propertyName], fileOptions);
}

