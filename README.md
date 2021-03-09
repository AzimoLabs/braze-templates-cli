# Braze templates CLI

---
## Usage

- [Build](#build) application for platform of your choice (supported: macOS x64, Linux x64)
- Move binary (email-templates) to the folder where your backup should be stored,
- Prepare config file (config.json) according to the example provided and put it in the same directory as binary. See [config](#config) for more details
- Run command. See [Command description](#commands)

### Commands
**Description**

Backup media type from Braze

**Command usage:**
```shell
./email-templates backup [type] {Options}
```
**Arguments:**
- `type`  Media type, possible values: `templates`, `content-blocks`

**Options:**
- `-h --help` Help Screen
- `-l, --list-only` Backup only list of objects and save as map
- `-i, --id` Backup only a specific id 

When no flag is provided, CLI will download list of available media types, saves it as a map and then back-ups all items of given type


### Config
**Important notes**
- API tokens need to have permissions set in Braze in order to perform CRUD operations on emails and content blocks.
- API tokens are not shared between sandbox and production
- Config file contains a production flag to differentiate the environment (staging - sandbox and production)

### Directories
Emails and content blocks data are stored in `backup` directory divided by environment (staging - sandbox templates or production), it's media type (templates, content-blocks).
Templates back up is divided into subject and body directories.

Each item is stored in HTML file with its name defined in Braze as a filename. If template or content block name defined in Braze contains a slash (/) it'll be replaced with a dash in the filename.

For emails templates body and subject HTML files are named the same.


## Development

Install Deno (v1.8.0):
- [Deno installation guide](<https://deno.land/manual/getting_started/installation>)

### Config
In order to run backup and update commands you need to have a config file defined.
See config-example.json file for more info.

### Commands
```shell
deno run --allow-read --allow-net --allow-write main.ts backup [mediaType] [--list-only] [--id <id>]
```
Flags for main command `backup` are described in the Usage section.
Flags `--allow-read --allow-net --allow-write` for `deno run` are required for CLI to access file system and network.

### Build
You can build application locally using:
```shell
deno compile -o ./email-templates --target x86_64-apple-darwin --unstable --allow-read --allow-net --allow-write ./main.ts
```
