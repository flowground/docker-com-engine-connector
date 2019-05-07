# ![LOGO](logo.png) Docker Engine **flow**ground Connector

## Description

A generated **flow**ground connector for the Docker Engine API (version 1.33).

Generated from: https://api.apis.guru/v2/specs/docker.com/engine/1.33/swagger.json<br/>
Generated at: 2019-05-07T17:40:15+03:00

## API Description

The Engine API is an HTTP API served by Docker Engine. It is the API the Docker client uses to communicate with the Engine, so everything the Docker client can do can be done with the API.

Most of the client's commands map directly to API endpoints (e.g. `docker ps` is `GET /containers/json`). The notable exception is running containers, which consists of several API calls.

# Errors

The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format:

```
{
  "message": "page not found"
}
```

# Versioning

The API is usually changed in each release of Docker, so API calls are versioned to ensure that clients don't break.

For Docker Engine 17.09, the API version is 1.32. To lock to this version, you prefix the URL with `/v1.32`. For example, calling `/info` is the same as calling `/v1.32/info`.

Engine releases in the near future should support this version of the API, so your client will continue to work even if it is talking to a newer Engine.

In previous versions of Docker, it was possible to access the API without providing a version. This behaviour is now deprecated will be removed in a future version of Docker.

The API uses an open schema model, which means server may add extra properties to responses. Likewise, the server will ignore any extra query parameters and request body properties. When you write clients, you need to ignore additional properties in responses to ensure they do not break when talking to newer Docker daemons.

This documentation is for version 1.33 of the API. Use this table to find documentation for previous versions of the API:

Docker version  | API version | Changes
----------------|-------------|---------
17.09.x | [1.31](https://docs.docker.com/engine/api/v1.32/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-32-api-changes)
17.07.x | [1.31](https://docs.docker.com/engine/api/v1.31/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-31-api-changes)
17.06.x | [1.30](https://docs.docker.com/engine/api/v1.30/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-30-api-changes)
17.05.x | [1.29](https://docs.docker.com/engine/api/v1.29/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-29-api-changes)
17.04.x | [1.28](https://docs.docker.com/engine/api/v1.28/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-28-api-changes)
17.03.1 | [1.27](https://docs.docker.com/engine/api/v1.27/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-27-api-changes)
1.13.1 & 17.03.0 | [1.26](https://docs.docker.com/engine/api/v1.26/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-26-api-changes)
1.13.0 | [1.25](https://docs.docker.com/engine/api/v1.25/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-25-api-changes)
1.12.x | [1.24](https://docs.docker.com/engine/api/v1.24/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-24-api-changes)
1.11.x | [1.23](https://docs.docker.com/engine/api/v1.23/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-23-api-changes)
1.10.x | [1.22](https://docs.docker.com/engine/api/v1.22/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-22-api-changes)
1.9.x | [1.21](https://docs.docker.com/engine/api/v1.21/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-21-api-changes)
1.8.x | [1.20](https://docs.docker.com/engine/api/v1.20/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-20-api-changes)
1.7.x | [1.19](https://docs.docker.com/engine/api/v1.19/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-19-api-changes)
1.6.x | [1.18](https://docs.docker.com/engine/api/v1.18/) | [API changes](https://docs.docker.com/engine/api/version-history/#v1-18-api-changes)

# Authentication

Authentication for registries is handled client side. The client has to send authentication details to various endpoints that need to communicate with registries, such as `POST /images/(name)/push`. These are sent as `X-Registry-Auth` header as a Base64 encoded (JSON) string with the following structure:

```
{
  "username": "string",
  "password": "string",
  "email": "string",
  "serveraddress": "string"
}
```

The `serveraddress` is a domain/IP without a protocol. Throughout this structure, double quotes are required.

If you have already got an identity token from the [`/auth` endpoint](#operation/SystemAuth), you can just pass this instead of credentials:

```
{
  "identitytoken": "9cbaf023786cd7..."
}
```


## Authorization

This API does not require authorization.

## Actions

### Ping

> This is a dummy endpoint you can use to test if the server is accessible.

*Tags:* `System`

### Check auth configuration

> Validate credentials for a registry and, if available, get an identity token for accessing the registry without password.

*Tags:* `System`

### Build an image

> Build an image from a tar archive with a `Dockerfile` in it.<br/>
> <br/>
> The `Dockerfile` specifies how the image is built from the tar archive. It is typically in the archive's root, but can be at a different path or have a different name by specifying the `dockerfile` parameter. [See the `Dockerfile` reference for more information](https://docs.docker.com/engine/reference/builder/).<br/>
> <br/>
> The Docker daemon performs a preliminary validation of the `Dockerfile` before starting the build, and returns an error if the syntax is incorrect. After that, each instruction is run one-by-one until the ID of the new image is output.<br/>
> <br/>
> The build is canceled if the client drops the connection by quitting or being killed.

*Tags:* `Image`

#### Input Parameters
* `dockerfile` - _optional_ - Path within the build context to the `Dockerfile`. This is ignored if `remote` is specified and points to an external `Dockerfile`.
* `t` - _optional_ - A name and optional tag to apply to the image in the `name:tag` format. If you omit the tag the default `latest` value is assumed. You can provide several `t` parameters.
* `extrahosts` - _optional_ - Extra hosts to add to /etc/hosts
* `remote` - _optional_ - A Git repository URI or HTTP/HTTPS context URI. If the URI points to a single text file, the file's contents are placed into a file called `Dockerfile` and the image is built from that file. If the URI points to a tarball, the file is downloaded by the daemon and the contents therein used as the context for the build. If the URI points to a tarball and the `dockerfile` parameter is also specified, there must be a file with the corresponding path inside the tarball.
* `q` - _optional_ - Suppress verbose build output.
* `nocache` - _optional_ - Do not use the cache when building the image.
* `cachefrom` - _optional_ - JSON array of images used for build cache resolution.
* `pull` - _optional_ - Attempt to pull the image even if an older image exists locally.
* `rm` - _optional_ - Remove intermediate containers after a successful build.
* `forcerm` - _optional_ - Always remove intermediate containers, even upon failure.
* `memory` - _optional_ - Set memory limit for build.
* `memswap` - _optional_ - Total memory (memory + swap). Set as `-1` to disable swap.
* `cpushares` - _optional_ - CPU shares (relative weight).
* `cpusetcpus` - _optional_ - CPUs in which to allow execution (e.g., `0-3`, `0,1`).
* `cpuperiod` - _optional_ - The length of a CPU period in microseconds.
* `cpuquota` - _optional_ - Microseconds of CPU time that the container can get in a CPU period.
* `buildargs` - _optional_ - JSON map of string pairs for build-time variables. Users pass these values at build-time. Docker uses the buildargs as the environment context for commands run via the `Dockerfile` RUN instruction, or for variable expansion in other `Dockerfile` instructions. This is not meant for passing secret values. [Read more about the buildargs instruction.](https://docs.docker.com/engine/reference/builder/#arg)
* `shmsize` - _optional_ - Size of `/dev/shm` in bytes. The size must be greater than 0. If omitted the system uses 64MB.
* `squash` - _optional_ - Squash the resulting images layers into a single layer. *(Experimental release only.)*
* `labels` - _optional_ - Arbitrary key/value labels to set on the image, as a JSON map of string pairs.
* `networkmode` - _optional_ - Sets the networking mode for the run commands during build. Supported standard values are: `bridge`, `host`, `none`, and `container:<name|id>`. Any other value is taken as a custom network's name to which this container should connect to.
* `Content-type` - _optional_
    Possible values: application/x-tar.
* `X-Registry-Config` - _optional_ - This is a base64-encoded JSON object with auth configurations for multiple registries that a build may refer to.

The key is a registry URL, and the value is an auth configuration object, [as described in the authentication section](#section/Authentication). For example:

```
{
  "docker.example.com": {
    "username": "janedoe",
    "password": "hunter2"
  },
  "https://index.docker.io/v1/": {
    "username": "mobydock",
    "password": "conta1n3rize14"
  }
}
```

Only the registry domain name (and port if not the default 443) are required. However, for legacy reasons, the Docker Hub registry must be specified with both a `https://` prefix and a `/v1/` suffix even though Docker will prefer to use the v2 registry API.


### Delete builder cache

*Tags:* `Image`

### Create a new image from a container

*Tags:* `Image`

#### Input Parameters
* `container` - _optional_ - The ID or name of the container to commit
* `repo` - _optional_ - Repository name for the created image
* `tag` - _optional_ - Tag name for the create image
* `comment` - _optional_ - Commit message
* `author` - _optional_ - Author of the image (e.g., `John Hannibal Smith <hannibal@a-team.com>`)
* `pause` - _optional_ - Whether to pause the container before committing
* `changes` - _optional_ - `Dockerfile` instructions to apply while committing

### List configs

*Tags:* `Config`

#### Input Parameters
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the configs list. Available filters:

- `id=<config id>`
- `label=<key> or label=<key>=value`
- `name=<config name>`
- `names=<config name>`


### Create a config

*Tags:* `Config`

### Delete a config

*Tags:* `Config`

#### Input Parameters
* `id` - _required_ - ID of the config

### Inspect a config

*Tags:* `Config`

#### Input Parameters
* `id` - _required_ - ID of the config

### Update a Config

*Tags:* `Config`

#### Input Parameters
* `id` - _required_ - The ID or name of the config
* `version` - _required_ - The version number of the config object being updated. This is required to avoid conflicting writes.

### Create a container

*Tags:* `Container`

#### Input Parameters
* `name` - _optional_ - Assign the specified name to the container. Must match `/?[a-zA-Z0-9_-]+`.

### List containers

> Returns a list of containers. For details on the format, see [the inspect endpoint](#operation/ContainerInspect).<br/>
> <br/>
> Note that it uses a different, smaller representation of a container than inspecting a single container. For example,<br/>
> the list of linked containers is not propagated .

*Tags:* `Container`

#### Input Parameters
* `all` - _optional_ - Return all containers. By default, only running containers are shown
* `limit` - _optional_ - Return this number of most recently created containers, including non-running ones.
* `size` - _optional_ - Return the size of container as fields `SizeRw` and `SizeRootFs`.
* `filters` - _optional_ - Filters to process on the container list, encoded as JSON (a `map[string][]string`). For example, `{"status": ["paused"]}` will only return paused containers. Available filters:

- `ancestor`=(`<image-name>[:<tag>]`, `<image id>`, or `<image@digest>`)
- `before`=(`<container id>` or `<container name>`)
- `expose`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)
- `exited=<int>` containers with exit code of `<int>`
- `health`=(`starting`|`healthy`|`unhealthy`|`none`)
- `id=<ID>` a container's ID
- `isolation=`(`default`|`process`|`hyperv`) (Windows daemon only)
- `is-task=`(`true`|`false`)
- `label=key` or `label="key=value"` of a container label
- `name=<name>` a container's name
- `network`=(`<network id>` or `<network name>`)
- `publish`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)
- `since`=(`<container id>` or `<container name>`)
- `status=`(`created`|`restarting`|`running`|`removing`|`paused`|`exited`|`dead`)
- `volume`=(`<volume name>` or `<mount point destination>`)


### Delete stopped containers

*Tags:* `Container`

#### Input Parameters
* `filters` - _optional_ - Filters to process on the prune list, encoded as JSON (a `map[string][]string`).

Available filters:
- `until=<timestamp>` Prune containers created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time.
- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune containers with (or without, in case `label!=...` is used) the specified labels.


### Remove a container

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `v` - _optional_ - Remove the volumes associated with the container.
* `force` - _optional_ - If the container is running, kill it before removing it.
* `link` - _optional_ - Remove the specified link associated with the container.

### Get an archive of a filesystem resource in a container

> Get a tar archive of a resource in the filesystem of container id.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `path` - _required_ - Resource in the container's filesystem to archive.

### Get information about files in a container

> A response header `X-Docker-Container-Path-Stat` is return containing a base64 - encoded JSON object with some filesystem header information about the path.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `path` - _required_ - Resource in the container's filesystem to archive.

### Extract an archive of files or folders to a directory in a container

> Upload a tar archive to be extracted to a path in the filesystem of container id.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `path` - _required_ - Path to a directory in the container to extract the archive's contents into. 
* `noOverwriteDirNonDir` - _optional_ - If "1", "true", or "True" then it will be an error if unpacking the given content would cause an existing directory to be replaced with a non-directory and vice versa.

### Attach to a container

> Attach to a container to read its output or send it input. You can attach to the same container multiple times and you can reattach to containers that have been detached.<br/>
> <br/>
> Either the `stream` or `logs` parameter must be `true` for this endpoint to do anything.<br/>
> <br/>
> See [the documentation for the `docker attach` command](https://docs.docker.com/engine/reference/commandline/attach/) for more details.<br/>
> <br/>
> ### Hijacking<br/>
> <br/>
> This endpoint hijacks the HTTP connection to transport `stdin`, `stdout`, and `stderr` on the same socket.<br/>
> <br/>
> This is the response from the daemon for an attach request:<br/>
> <br/>
> ```<br/>
> HTTP/1.1 200 OK<br/>
> Content-Type: application/vnd.docker.raw-stream<br/>
> <br/>
> [STREAM]<br/>
> ```<br/>
> <br/>
> After the headers and two new lines, the TCP connection can now be used for raw, bidirectional communication between the client and server.<br/>
> <br/>
> To hint potential proxies about connection hijacking, the Docker client can also optionally send connection upgrade headers.<br/>
> <br/>
> For example, the client sends this request to upgrade the connection:<br/>
> <br/>
> ```<br/>
> POST /containers/16253994b7c4/attach?stream=1&stdout=1 HTTP/1.1<br/>
> Upgrade: tcp<br/>
> Connection: Upgrade<br/>
> ```<br/>
> <br/>
> The Docker daemon will respond with a `101 UPGRADED` response, and will similarly follow with the raw stream:<br/>
> <br/>
> ```<br/>
> HTTP/1.1 101 UPGRADED<br/>
> Content-Type: application/vnd.docker.raw-stream<br/>
> Connection: Upgrade<br/>
> Upgrade: tcp<br/>
> <br/>
> [STREAM]<br/>
> ```<br/>
> <br/>
> ### Stream format<br/>
> <br/>
> When the TTY setting is disabled in [`POST /containers/create`](#operation/ContainerCreate), the stream over the hijacked connected is multiplexed to separate out `stdout` and `stderr`. The stream consists of a series of frames, each containing a header and a payload.<br/>
> <br/>
> The header contains the information which the stream writes (`stdout` or `stderr`). It also contains the size of the associated frame encoded in the last four bytes (`uint32`).<br/>
> <br/>
> It is encoded on the first eight bytes like this:<br/>
> <br/>
> ```go<br/>
> header := [8]byte{STREAM_TYPE, 0, 0, 0, SIZE1, SIZE2, SIZE3, SIZE4}<br/>
> ```<br/>
> <br/>
> `STREAM_TYPE` can be:<br/>
> <br/>
> - 0: `stdin` (is written on `stdout`)<br/>
> - 1: `stdout`<br/>
> - 2: `stderr`<br/>
> <br/>
> `SIZE1, SIZE2, SIZE3, SIZE4` are the four bytes of the `uint32` size encoded as big endian.<br/>
> <br/>
> Following the header is the payload, which is the specified number of bytes of `STREAM_TYPE`.<br/>
> <br/>
> The simplest way to implement this protocol is the following:<br/>
> <br/>
> 1. Read 8 bytes.<br/>
> 2. Choose `stdout` or `stderr` depending on the first byte.<br/>
> 3. Extract the frame size from the last four bytes.<br/>
> 4. Read the extracted size and output it on the correct output.<br/>
> 5. Goto 1.<br/>
> <br/>
> ### Stream format when using a TTY<br/>
> <br/>
> When the TTY setting is enabled in [`POST /containers/create`](#operation/ContainerCreate), the stream is not multiplexed. The data exchanged over the hijacked connection is simply the raw data from the process PTY and client's `stdin`.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `detachKeys` - _optional_ - Override the key sequence for detaching a container.Format is a single character `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`.
* `logs` - _optional_ - Replay previous logs from the container.

This is useful for attaching to a container that has started and you want to output everything since the container started.

If `stream` is also enabled, once all the previous output has been returned, it will seamlessly transition into streaming current output.

* `stream` - _optional_ - Stream attached streams from the time the request was made onwards
* `stdin` - _optional_ - Attach to `stdin`
* `stdout` - _optional_ - Attach to `stdout`
* `stderr` - _optional_ - Attach to `stderr`

### Attach to a container via a websocket

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `detachKeys` - _optional_ - Override the key sequence for detaching a container.Format is a single character `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,`, or `_`.
* `logs` - _optional_ - Return logs
* `stream` - _optional_ - Return stream
* `stdin` - _optional_ - Attach to `stdin`
* `stdout` - _optional_ - Attach to `stdout`
* `stderr` - _optional_ - Attach to `stderr`

### Get changes on a container's filesystem

> Returns which files in a container's filesystem have been added, deleted,<br/>
> or modified. The `Kind` of modification can be one of:<br/>
> <br/>
> - `0`: Modified<br/>
> - `1`: Added<br/>
> - `2`: Deleted

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container

### Create an exec instance

> Run a command inside a running container.

*Tags:* `Exec`

#### Input Parameters
* `id` - _required_ - ID or name of container

### Export a container

> Export the contents of a container as a tarball.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container

### Inspect a container

> Return low-level information about a container.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `size` - _optional_ - Return the size of container as fields `SizeRw` and `SizeRootFs`

### Kill a container

> Send a POSIX signal to a container, defaulting to killing to the container.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `signal` - _optional_ - Signal to send to the container as an integer or string (e.g. `SIGINT`)

### Get container logs

> Get `stdout` and `stderr` logs from a container.<br/>
> <br/>
> Note: This endpoint works only for containers with the `json-file` or `journald` logging driver.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `follow` - _optional_ - Return the logs as a stream.

This will return a `101` HTTP response with a `Connection: upgrade` header, then hijack the HTTP connection to send raw output. For more information about hijacking and the stream format, [see the documentation for the attach endpoint](#operation/ContainerAttach).

* `stdout` - _optional_ - Return logs from `stdout`
* `stderr` - _optional_ - Return logs from `stderr`
* `since` - _optional_ - Only return logs since this time, as a UNIX timestamp
* `timestamps` - _optional_ - Add timestamps to every log line
* `tail` - _optional_ - Only return this number of log lines from the end of the logs. Specify as an integer or `all` to output all log lines.

### Pause a container

> Use the cgroups freezer to suspend all processes in a container.<br/>
> <br/>
> Traditionally, when suspending a process the `SIGSTOP` signal is used, which is observable by the process being suspended. With the cgroups freezer the process is unaware, and unable to capture, that it is being suspended, and subsequently resumed.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container

### Rename a container

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `name` - _required_ - New name for the container

### Resize a container TTY

> Resize the TTY for a container. You must restart the container for the resize to take effect.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `h` - _optional_ - Height of the tty session in characters
* `w` - _optional_ - Width of the tty session in characters

### Restart a container

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `t` - _optional_ - Number of seconds to wait before killing the container

### Start a container

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `detachKeys` - _optional_ - Override the key sequence for detaching a container. Format is a single character `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`.

### Get container stats based on resource usage

> This endpoint returns a live stream of a container's resource usage<br/>
> statistics.<br/>
> <br/>
> The `precpu_stats` is the CPU statistic of last read, which is used<br/>
> for calculating the CPU usage percentage. It is not the same as the<br/>
> `cpu_stats` field.<br/>
> <br/>
> If either `precpu_stats.online_cpus` or `cpu_stats.online_cpus` is<br/>
> nil then for compatibility with older daemons the length of the<br/>
> corresponding `cpu_usage.percpu_usage` array should be used.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `stream` - _optional_ - Stream the output. If false, the stats will be output once and then it will disconnect.

### Stop a container

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `t` - _optional_ - Number of seconds to wait before killing the container

### List processes running inside a container

> On Unix systems, this is done by running the `ps` command. This endpoint is not supported on Windows.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `ps_args` - _optional_ - The arguments to pass to `ps`. For example, `aux`

### Unpause a container

> Resume a container which has been paused.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container

### Update a container

> Change various configuration options of a container without having to recreate it.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container

### Wait for a container

> Block until a container stops, then returns the exit code.

*Tags:* `Container`

#### Input Parameters
* `id` - _required_ - ID or name of the container
* `condition` - _optional_ - Wait until a container state reaches the given condition, either 'not-running' (default), 'next-exit', or 'removed'.

### Get image information from the registry

> Return image digest and platform information by contacting the registry.

*Tags:* `Distribution`

#### Input Parameters
* `name` - _required_ - Image name or id

### Monitor events

> Stream real-time events from the server.<br/>
> <br/>
> Various objects within Docker report events when something happens to them.<br/>
> <br/>
> Containers report these events: `attach`, `commit`, `copy`, `create`, `destroy`, `detach`, `die`, `exec_create`, `exec_detach`, `exec_start`, `export`, `health_status`, `kill`, `oom`, `pause`, `rename`, `resize`, `restart`, `start`, `stop`, `top`, `unpause`, and `update`<br/>
> <br/>
> Images report these events: `delete`, `import`, `load`, `pull`, `push`, `save`, `tag`, and `untag`<br/>
> <br/>
> Volumes report these events: `create`, `mount`, `unmount`, and `destroy`<br/>
> <br/>
> Networks report these events: `create`, `connect`, `disconnect`, `destroy`, `update`, and `remove`<br/>
> <br/>
> The Docker daemon reports these events: `reload`<br/>
> <br/>
> Services report these events: `create`, `update`, and `remove`<br/>
> <br/>
> Nodes report these events: `create`, `update`, and `remove`<br/>
> <br/>
> Secrets report these events: `create`, `update`, and `remove`<br/>
> <br/>
> Configs report these events: `create`, `update`, and `remove`

*Tags:* `System`

#### Input Parameters
* `since` - _optional_ - Show events created since this timestamp then stream new events.
* `until` - _optional_ - Show events created until this timestamp then stop streaming.
* `filters` - _optional_ - A JSON encoded value of filters (a `map[string][]string`) to process on the event list. Available filters:

- `config=<string>` config name or ID
- `container=<string>` container name or ID
- `daemon=<string>` daemon name or ID
- `event=<string>` event type
- `image=<string>` image name or ID
- `label=<string>` image or container label
- `network=<string>` network name or ID
- `node=<string>` node ID
- `plugin`=<string> plugin name or ID
- `scope`=<string> local or swarm
- `secret=<string>` secret name or ID
- `service=<string>` service name or ID
- `type=<string>` object to filter by, one of `container`, `image`, `volume`, `network`, `daemon`, `plugin`, `node`, `service`, `secret` or `config`
- `volume=<string>` volume name


### Inspect an exec instance

> Return low-level information about an exec instance.

*Tags:* `Exec`

#### Input Parameters
* `id` - _required_ - Exec instance ID

### Resize an exec instance

> Resize the TTY session used by an exec instance. This endpoint only works if `tty` was specified as part of creating and starting the exec instance.

*Tags:* `Exec`

#### Input Parameters
* `id` - _required_ - Exec instance ID
* `h` - _optional_ - Height of the TTY session in characters
* `w` - _optional_ - Width of the TTY session in characters

### Start an exec instance

> Starts a previously set up exec instance. If detach is true, this endpoint returns immediately after starting the command. Otherwise, it sets up an interactive session with the command.

*Tags:* `Exec`

#### Input Parameters
* `id` - _required_ - Exec instance ID

### Create an image

> Create an image by either pulling it from a registry or importing it.

*Tags:* `Image`

#### Input Parameters
* `fromImage` - _optional_ - Name of the image to pull. The name may include a tag or digest. This parameter may only be used when pulling an image. The pull is cancelled if the HTTP connection is closed.
* `fromSrc` - _optional_ - Source to import. The value may be a URL from which the image can be retrieved or `-` to read the image from the request body. This parameter may only be used when importing an image.
* `repo` - _optional_ - Repository name given to an image when it is imported. The repo may include a tag. This parameter may only be used when importing an image.
* `tag` - _optional_ - Tag or digest. If empty when pulling an image, this causes all tags for the given image to be pulled.
* `X-Registry-Auth` - _optional_ - A base64-encoded auth configuration. [See the authentication section for details.](#section/Authentication)

### Export several images

> Get a tarball containing all images and metadata for several image repositories.<br/>
> <br/>
> For each value of the `names` parameter: if it is a specific name and tag (e.g. `ubuntu:latest`), then only that image (and its parents) are returned; if it is an image ID, similarly only that image (and its parents) are returned and there would be no names referenced in the 'repositories' file for this image ID.<br/>
> <br/>
> For details on the format, see [the export image endpoint](#operation/ImageGet).

*Tags:* `Image`

#### Input Parameters
* `names` - _optional_ - Image names to filter by

### List Images

> Returns a list of images on the server. Note that it uses a different, smaller representation of an image than inspecting a single image.

*Tags:* `Image`

#### Input Parameters
* `all` - _optional_ - Show all images. Only images from a final layer (no children) are shown by default.
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the images list. Available filters:

- `before`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)
- `dangling=true`
- `label=key` or `label="key=value"` of an image label
- `reference`=(`<image-name>[:<tag>]`)
- `since`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)

* `digests` - _optional_ - Show digest information as a `RepoDigests` field on each image.

### Import images

> Load a set of images and tags into a repository.<br/>
> <br/>
> For details on the format, see [the export image endpoint](#operation/ImageGet).

*Tags:* `Image`

#### Input Parameters
* `quiet` - _optional_ - Suppress progress details during load.

### Delete unused images

*Tags:* `Image`

#### Input Parameters
* `filters` - _optional_ - Filters to process on the prune list, encoded as JSON (a `map[string][]string`). Available filters:

- `dangling=<boolean>` When set to `true` (or `1`), prune only
   unused *and* untagged images. When set to `false`
   (or `0`), all unused images are pruned.
- `until=<string>` Prune images created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time.
- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune images with (or without, in case `label!=...` is used) the specified labels.


### Search images

> Search for an image on Docker Hub.

*Tags:* `Image`

#### Input Parameters
* `term` - _required_ - Term to search
* `limit` - _optional_ - Maximum number of results to return
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the images list. Available filters:

- `is-automated=(true|false)`
- `is-official=(true|false)`
- `stars=<number>` Matches images that has at least 'number' stars.


### Remove an image

> Remove an image, along with any untagged parent images that were<br/>
> referenced by that image.<br/>
> <br/>
> Images can't be removed if they have descendant images, are being<br/>
> used by a running container or are being used by a build.

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or ID
* `force` - _optional_ - Remove the image even if it is being used by stopped containers or has other tags
* `noprune` - _optional_ - Do not delete untagged parent images

### Export an image

> Get a tarball containing all images and metadata for a repository.<br/>
> <br/>
> If `name` is a specific name and tag (e.g. `ubuntu:latest`), then only that image (and its parents) are returned. If `name` is an image ID, similarly only that image (and its parents) are returned, but with the exclusion of the `repositories` file in the tarball, as there were no image names referenced.<br/>
> <br/>
> ### Image tarball format<br/>
> <br/>
> An image tarball contains one directory per image layer (named using its long ID), each containing these files:<br/>
> <br/>
> - `VERSION`: currently `1.0` - the file format version<br/>
> - `json`: detailed layer information, similar to `docker inspect layer_id`<br/>
> - `layer.tar`: A tarfile containing the filesystem changes in this layer<br/>
> <br/>
> The `layer.tar` file contains `aufs` style `.wh..wh.aufs` files and directories for storing attribute changes and deletions.<br/>
> <br/>
> If the tarball defines a repository, the tarball should also include a `repositories` file at the root that contains a list of repository and tag names mapped to layer IDs.<br/>
> <br/>
> ```json<br/>
> {<br/>
>   "hello-world": {<br/>
>     "latest": "565a9d68a73f6706862bfe8409a7f659776d4d60a8d096eb4a3cbce6999cc2a1"<br/>
>   }<br/>
> }<br/>
> ```

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or ID

### Get the history of an image

> Return parent layers of an image.

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or ID

### Inspect an image

> Return low-level information about an image.

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or id

### Push an image

> Push an image to a registry.<br/>
> <br/>
> If you wish to push an image on to a private registry, that image must already have a tag which references the registry. For example, `registry.example.com/myimage:latest`.<br/>
> <br/>
> The push is cancelled if the HTTP connection is closed.

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or ID.
* `tag` - _optional_ - The tag to associate with the image on the registry.
* `X-Registry-Auth` - _required_ - A base64-encoded auth configuration. [See the authentication section for details.](#section/Authentication)

### Tag an image

> Tag an image so that it becomes part of a repository.

*Tags:* `Image`

#### Input Parameters
* `name` - _required_ - Image name or ID to tag.
* `repo` - _optional_ - The repository to tag in. For example, `someuser/someimage`.
* `tag` - _optional_ - The name of the new tag.

### Get system information

*Tags:* `System`

### List networks

> Returns a list of networks. For details on the format, see [the network inspect endpoint](#operation/NetworkInspect).<br/>
> <br/>
> Note that it uses a different, smaller representation of a network than inspecting a single network. For example,<br/>
> the list of containers attached to the network is not propagated in API versions 1.28 and up.

*Tags:* `Network`

#### Input Parameters
* `filters` - _optional_ - JSON encoded value of the filters (a `map[string][]string`) to process on the networks list. Available filters:

- `driver=<driver-name>` Matches a network's driver.
- `id=<network-id>` Matches all or part of a network ID.
- `label=<key>` or `label=<key>=<value>` of a network label.
- `name=<network-name>` Matches all or part of a network name.
- `scope=["swarm"|"global"|"local"]` Filters networks by scope (`swarm`, `global`, or `local`).
- `type=["custom"|"builtin"]` Filters networks by type. The `custom` keyword returns all user-defined networks.


### Create a network

*Tags:* `Network`

### Delete unused networks

*Tags:* `Network`

#### Input Parameters
* `filters` - _optional_ - Filters to process on the prune list, encoded as JSON (a `map[string][]string`).

Available filters:
- `until=<timestamp>` Prune networks created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time.
- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune networks with (or without, in case `label!=...` is used) the specified labels.


### Remove a network

*Tags:* `Network`

#### Input Parameters
* `id` - _required_ - Network ID or name

### Inspect a network

*Tags:* `Network`

#### Input Parameters
* `id` - _required_ - Network ID or name
* `verbose` - _optional_ - Detailed inspect output for troubleshooting
* `scope` - _optional_ - Filter the network by scope (swarm, global, or local)

### Connect a container to a network

*Tags:* `Network`

#### Input Parameters
* `id` - _required_ - Network ID or name

### Disconnect a container from a network

*Tags:* `Network`

#### Input Parameters
* `id` - _required_ - Network ID or name

### List nodes

*Tags:* `Node`

#### Input Parameters
* `filters` - _optional_ - Filters to process on the nodes list, encoded as JSON (a `map[string][]string`).

Available filters:
- `id=<node id>`
- `label=<engine label>`
- `membership=`(`accepted`|`pending`)`
- `name=<node name>`
- `role=`(`manager`|`worker`)`


### Delete a node

*Tags:* `Node`

#### Input Parameters
* `id` - _required_ - The ID or name of the node
* `force` - _optional_ - Force remove a node from the swarm

### Inspect a node

*Tags:* `Node`

#### Input Parameters
* `id` - _required_ - The ID or name of the node

### Update a node

*Tags:* `Node`

#### Input Parameters
* `id` - _required_ - The ID of the node
* `version` - _required_ - The version number of the node object being updated. This is required to avoid conflicting writes.

### List plugins

> Returns information about installed plugins.

*Tags:* `Plugin`

#### Input Parameters
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the plugin list. Available filters:

- `capability=<capability name>`
- `enable=<true>|<false>`


### Create a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Get plugin privileges

*Tags:* `Plugin`

#### Input Parameters
* `remote` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Install a plugin

> Pulls and installs a plugin. After the plugin is installed, it can be enabled using the [`POST /plugins/{name}/enable` endpoint](#operation/PostPluginsEnable).

*Tags:* `Plugin`

#### Input Parameters
* `remote` - _required_ - Remote reference for plugin to install.

The `:latest` tag is optional, and is used as the default if omitted.

* `name` - _optional_ - Local name for the pulled plugin.

The `:latest` tag is optional, and is used as the default if omitted.

* `X-Registry-Auth` - _optional_ - A base64-encoded auth configuration to use when pulling a plugin from a registry. [See the authentication section for details.](#section/Authentication)

### Remove a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.
* `force` - _optional_ - Disable the plugin before removing. This may result in issues if the plugin is in use by a container.

### Disable a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Enable a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.
* `timeout` - _optional_ - Set the HTTP client timeout (in seconds)

### Inspect a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Push a plugin

> Push a plugin to the registry.

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Configure a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.

### Upgrade a plugin

*Tags:* `Plugin`

#### Input Parameters
* `name` - _required_ - The name of the plugin. The `:latest` tag is optional, and is the default if omitted.
* `remote` - _required_ - Remote reference to upgrade to.

The `:latest` tag is optional, and is used as the default if omitted.

* `X-Registry-Auth` - _optional_ - A base64-encoded auth configuration to use when pulling a plugin from a registry. [See the authentication section for details.](#section/Authentication)

### List secrets

*Tags:* `Secret`

#### Input Parameters
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the secrets list. Available filters:

- `id=<secret id>`
- `label=<key> or label=<key>=value`
- `name=<secret name>`
- `names=<secret name>`


### Create a secret

*Tags:* `Secret`

### Delete a secret

*Tags:* `Secret`

#### Input Parameters
* `id` - _required_ - ID of the secret

### Inspect a secret

*Tags:* `Secret`

#### Input Parameters
* `id` - _required_ - ID of the secret

### Update a Secret

*Tags:* `Secret`

#### Input Parameters
* `id` - _required_ - The ID or name of the secret
* `version` - _required_ - The version number of the secret object being updated. This is required to avoid conflicting writes.

### List services

*Tags:* `Service`

#### Input Parameters
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the services list. Available filters:

- `id=<service id>`
- `label=<service label>`
- `mode=["replicated"|"global"]`
- `name=<service name>`


### Create a service

*Tags:* `Service`

#### Input Parameters
* `X-Registry-Auth` - _optional_ - A base64-encoded auth configuration for pulling from private registries. [See the authentication section for details.](#section/Authentication)

### Delete a service

*Tags:* `Service`

#### Input Parameters
* `id` - _required_ - ID or name of service.

### Inspect a service

*Tags:* `Service`

#### Input Parameters
* `id` - _required_ - ID or name of service.
* `insertDefaults` - _optional_ - Fill empty fields with default values.

### Get service logs

> Get `stdout` and `stderr` logs from a service.<br/>
> <br/>
> **Note**: This endpoint works only for services with the `json-file` or `journald` logging drivers.

*Tags:* `Service`

#### Input Parameters
* `id` - _required_ - ID or name of the service
* `details` - _optional_ - Show service context and extra details provided to logs.
* `follow` - _optional_ - Return the logs as a stream.

This will return a `101` HTTP response with a `Connection: upgrade` header, then hijack the HTTP connection to send raw output. For more information about hijacking and the stream format, [see the documentation for the attach endpoint](#operation/ContainerAttach).

* `stdout` - _optional_ - Return logs from `stdout`
* `stderr` - _optional_ - Return logs from `stderr`
* `since` - _optional_ - Only return logs since this time, as a UNIX timestamp
* `timestamps` - _optional_ - Add timestamps to every log line
* `tail` - _optional_ - Only return this number of log lines from the end of the logs. Specify as an integer or `all` to output all log lines.

### Update a service

*Tags:* `Service`

#### Input Parameters
* `id` - _required_ - ID or name of service.
* `version` - _required_ - The version number of the service object being updated. This is required to avoid conflicting writes.
* `registryAuthFrom` - _optional_ - If the X-Registry-Auth header is not specified, this parameter indicates where to find registry authorization credentials. The valid values are `spec` and `previous-spec`.
* `rollback` - _optional_ - Set to this parameter to `previous` to cause a server-side rollback to the previous service spec. The supplied spec will be ignored in this case.
* `X-Registry-Auth` - _optional_ - A base64-encoded auth configuration for pulling from private registries. [See the authentication section for details.](#section/Authentication)

### Initialize interactive session

> Start a new interactive session with a server. Session allows server to call back to the client for advanced capabilities.<br/>
> <br/>
> > **Note**: This endpoint is *experimental* and only available if the daemon is started with experimental<br/>
> > features enabled. The specifications for this endpoint may still change in a future version of the API.<br/>
> <br/>
> ### Hijacking<br/>
> <br/>
> This endpoint hijacks the HTTP connection to HTTP2 transport that allows the client to expose gPRC services on that connection.<br/>
> <br/>
> For example, the client sends this request to upgrade the connection:<br/>
> <br/>
> ```<br/>
> POST /session HTTP/1.1<br/>
> Upgrade: h2c<br/>
> Connection: Upgrade<br/>
> ```<br/>
> <br/>
> The Docker daemon will respond with a `101 UPGRADED` response follow with the raw stream:<br/>
> <br/>
> ```<br/>
> HTTP/1.1 101 UPGRADED<br/>
> Connection: Upgrade<br/>
> Upgrade: h2c<br/>
> ```

*Tags:* `Session (experimental)`

### Inspect swarm

*Tags:* `Swarm`

### Initialize a new swarm

*Tags:* `Swarm`

### Join an existing swarm

*Tags:* `Swarm`

### Leave a swarm

*Tags:* `Swarm`

#### Input Parameters
* `force` - _optional_ - Force leave swarm, even if this is the last manager or that it will break the cluster.

### Unlock a locked manager

*Tags:* `Swarm`

### Get the unlock key

*Tags:* `Swarm`

### Update a swarm

*Tags:* `Swarm`

#### Input Parameters
* `version` - _required_ - The version number of the swarm object being updated. This is required to avoid conflicting writes.
* `rotateWorkerToken` - _optional_ - Rotate the worker join token.
* `rotateManagerToken` - _optional_ - Rotate the manager join token.
* `rotateManagerUnlockKey` - _optional_ - Rotate the manager unlock key.

### Get data usage information

*Tags:* `System`

### List tasks

*Tags:* `Task`

#### Input Parameters
* `filters` - _optional_ - A JSON encoded value of the filters (a `map[string][]string`) to process on the tasks list. Available filters:

- `desired-state=(running | shutdown | accepted)`
- `id=<task id>`
- `label=key` or `label="key=value"`
- `name=<task name>`
- `node=<node id or name>`
- `service=<service name>`


### Inspect a task

*Tags:* `Task`

#### Input Parameters
* `id` - _required_ - ID of the task

### Get task logs

> Get `stdout` and `stderr` logs from a task.<br/>
> <br/>
> **Note**: This endpoint works only for services with the `json-file` or `journald` logging drivers.

#### Input Parameters
* `id` - _required_ - ID of the task
* `details` - _optional_ - Show task context and extra details provided to logs.
* `follow` - _optional_ - Return the logs as a stream.

This will return a `101` HTTP response with a `Connection: upgrade` header, then hijack the HTTP connection to send raw output. For more information about hijacking and the stream format, [see the documentation for the attach endpoint](#operation/ContainerAttach).

* `stdout` - _optional_ - Return logs from `stdout`
* `stderr` - _optional_ - Return logs from `stderr`
* `since` - _optional_ - Only return logs since this time, as a UNIX timestamp
* `timestamps` - _optional_ - Add timestamps to every log line
* `tail` - _optional_ - Only return this number of log lines from the end of the logs. Specify as an integer or `all` to output all log lines.

### Get version

> Returns the version of Docker that is running and various information about the system that Docker is running on.

*Tags:* `System`

### List volumes

*Tags:* `Volume`

#### Input Parameters
* `filters` - _optional_ - JSON encoded value of the filters (a `map[string][]string`) to
process on the volumes list. Available filters:

- `dangling=<boolean>` When set to `true` (or `1`), returns all
   volumes that are not in use by a container. When set to `false`
   (or `0`), only volumes that are in use by one or more
   containers are returned.
- `driver=<volume-driver-name>` Matches volumes based on their driver.
- `label=<key>` or `label=<key>:<value>` Matches volumes based on
   the presence of a `label` alone or a `label` and a value.
- `name=<volume-name>` Matches all or part of a volume name.


### Create a volume

*Tags:* `Volume`

### Delete unused volumes

*Tags:* `Volume`

#### Input Parameters
* `filters` - _optional_ - Filters to process on the prune list, encoded as JSON (a `map[string][]string`).

Available filters:
- `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune volumes with (or without, in case `label!=...` is used) the specified labels.


### Remove a volume

> Instruct the driver to remove the volume.

*Tags:* `Volume`

#### Input Parameters
* `name` - _required_ - Volume name or ID
* `force` - _optional_ - Force the removal of the volume

### Inspect a volume

*Tags:* `Volume`

#### Input Parameters
* `name` - _required_ - Volume name or ID

## License

**flow**ground :- Telekom iPaaS / docker-com-engine-connector<br/>
Copyright © 2019, [Deutsche Telekom AG](https://www.telekom.de)<br/>
contact: flowground@telekom.de

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
