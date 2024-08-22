# Static Node Server

Serve your static files!
- serve a single file or a whole directory
- specify a port
- add a delay to simulate network throttling

## Set up

`npm link`

Running `npm link` will make this globally available from the CLI. 

## Usage

`serve path [-p number] [-d number]` 

In this absence of any arguments, this will display the available options.
```
serve <command>

Commands:
  serve <path>  the path or directory to serve

Options:
      --version  Show version number                                   [boolean]
  -p, --port     port to use                            [number] [default: 5555]
  -d, --delay    request timeout in milliseconds           [number] [default: 0]
      --help     Show help                                             [boolean]

You must specify the path to serve
```

The default port is `5555`. Try the following :

`serve .`

Open a web browser and visit : http://localhost:5555/

If you are serving a directory, visiting the root URL will display a directory listing you can navigate. 

### Exampes : 

Serve the contents of the current directory :

`serve .`

Serve a single file :

`serve package.json`

Serve the contents of some folder on port 1234 with a delay of 1 second :

`serve ~/Desktop/my-folder -p 1234 -d 1000`