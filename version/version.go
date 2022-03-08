package main

import (
	"embed"
	"io/fs"
	"fmt"
	"log"
	"net/http"
	"os"
)

//go:embed static
var embededFiles embed.FS

func main() {
	// using the function
	mydir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("*************************************")
	fmt.Println(mydir)
	fmt.Println("*************************************")

	directory := http.Dir("./static")
	fmt.Printf(string(directory))
	fileServer := http.FileServer(http.Dir(files)) // New code
	//fileServer := http.FileServer(http.Dir("./static")) // New code
	http.Handle("/", fileServer) // New code

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

# https://blog.carlmjohnson.net/post/2021/how-to-use-go-embed/



func getFileSystem() http.FileSystem {
	fsys, err := fs.Sub(embededFiles, "static")
	if err != nil {
		panic(err)
	}

	return http.FS(fsys)
}
