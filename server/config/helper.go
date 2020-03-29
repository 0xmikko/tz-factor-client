/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package config

import (
	"encoding/json"
	"github.com/go-playground/validator/v10"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

// Gets config from file
func LoadConfigFromJSON(filename string, targetStruct interface{}) {

	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal("Cant get working dir")
	}

	if strings.Contains(cwd, "/server/") {
		serverDir := "/server/"
		lastIndex := strings.Index(cwd, serverDir) + len(serverDir)
		filename = cwd[:lastIndex] + strings.TrimPrefix(filename, "./")
	}

	rawData, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatalf("Cant read file %s\n", filename)
	}

	if err = json.Unmarshal(rawData, targetStruct); err != nil {
		log.Fatalf("Cant unmarshal settings in %s\n", filename)
	}
}

// Validate config structures. If errors found, it break program
func validate(config interface{}) {

	// Config validation
	validate := validator.New()
	if err := validate.Struct(config); err != nil {

		// this check is only needed when your code could produce
		// an invalid value for validation such as interface with nil
		// value most including myself do not usually have code like this.
		if _, ok := err.(*validator.InvalidValidationError); ok {
			log.Fatalf("Validation error in file %s", err)
		}

		for _, err := range err.(validator.ValidationErrors) {

			log.Println("Configuration problem")
			log.Println("Please, check", err.Namespace(), err.Field())

		}

		// from here you can create your own error messages in whatever language you wish
		log.Fatal("Cant continue")
	}

}
