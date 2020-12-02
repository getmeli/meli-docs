---
title: 'Runner Environment Reference'
sidebarTitle: 'Runner'
excerpt: ''
---

# Runner Environment Reference

## DEBUG

**Default**: none

**Type**: string

**Description**:

Enable debug using the popular [debug](https://www.npmjs.com/package/debug) Npm package. To limit logs to Metroline, use `DEBUG=metroline.runner*`.

## METROLINE\_WORKSPACE\_CLEANUP\_TIMEOUT

**Default**: 5

**Type**: number

**Description**:

When we try to remove a pipeline workspace, we wait until all it's containers have been removed. This sets how much time (seconds) to wait for before we timeout.  

## METROLINE\_MAX\_PARALLEL\_JOBS

**Default**: 2

**Type**: number

**Description**:

Maximum number of parallel jobs.

## METROLINE\_PULL\_INTERVAL

**Default**: 1

**Type**: number

**Description**:

How often (seconds) the runner should pull for jobs. Note that runners are notified when new jobs are available, but this mechanism ensures that jobs are pulled when runners (re)connect. This value should have little impact on how fast jobs are picked up by runners. 

## METROLINE\_SERVER\_ADDRESS

**Default**: none

**Type**: string

**Description**:

Address of the Metroline server. 

## METROLINE\_SOCKET\_TIMEOUT

**Default**: 5

**Type**: number

**Description**:

How much time (seconds) to wait for the server to acknowledge runner registration. After timeout, we log an error but the runner keeps running. Socket.io tries to reconnect regularly.

## METROLINE\_RUNNER\_SECRET

**Default**: none

**Type**: string

**Description**:

Secret to use for communicating with the server.

## METROLINE\_SSL\_VERIFY

**Default**: true

**Type**: boolean

**Description**:

When set to false, the runner will not verify the SSL certificate served by the server.

## METROLINE\_DOCKER\_OPTIONS

**Default**: "{socketPath: '/var/run/docker.sock'}"

**Type**: string

**Description**:

Allows you to configure how the runner connects to the Docker daemon. This is a JSON string with a [dockerode constructor options](// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/dockerode/index.d.ts#L987). 

## METROLINE\_JOB\_DOCKER\_SOCK

**Default**: null

**Type**: string

**Description**:

This variable allows you to provide jobs with a Docker daemon so that they can run commands like `docker ps`, `docker run`, `docker build`. It should be the **path** to a Docker daemon. When set, this path is mounted as a volume in jobs, pointing to `/var/run/docker.sock`.

<div class="blockquote" data-props='{ "mod": "danger" }'>

Setting this option provides jobs with access to the Docker daemon on your runner's host, and hence can be a security issue. We will be working on ways to improve this in the future with services and Docker-in-docker, but for now this is a decent solution for making it possible to build Docker images in Metroline.  

</div>
