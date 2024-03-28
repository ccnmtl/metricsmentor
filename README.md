# Metrics Mentor
[![Actions Status](https://github.com/ccnmtl/metricsmentor/workflows/build-and-test/badge.svg)](https://github.com/ccnmtl/metricsmentor/actions)
Work in progress

## Getting Started
If using local dev enviornment:

1. Clone
   git clone https://github.com/ccnmtl/metricsmentor.git
   `cd metricsmentor`

2. Create the database Postgres:
    * Create a database user/password (if needed)
    * Create the database `createdb metricsmentor`

3. Customize settings
    * Create a `local_settings.py` file in the `metricsmentor` subdirectory OR
    * Copy `metricsmentor/settings_shared.py` to `metricsmentor/local_settings.py`
    * Then, override the variables from `settings_shared.py` that you need to customize for your local installation.
        * Customize your `DATABASE` dictionary
            * e.g. set NAME, HOST, USER, and PASSWORD. remove PORT (unless it's non-standard)
        * Specify ALLOWED_HOSTS = [ 'localhost', '.your.blackboard.or.moodle.domain', '.your.workstation.domain', ]
    * The ``PYLTI_CONFIG`` variable in your ``local_settings.py`` configures the application consumers and secrets. Generate two long random numbers for these values.

       ```
       PYLTI_CONFIG = {
           'consumers': {
               '<random number string>': {
                   'secret': '<random number string>'
               }
           }
       }
       ```

4. Build the virtual environment
   `make` will build the virtualenv

5. Migrate the database
   `./manage.py migrate`

6. Run `make dev`
   This is equivalent to running Django's ./manage.py runserver in one shell and Webpack in another. The output from both will be printed to the shell. Use CTR-C to exit.

If using docker:

Run: `docker compose up`

If your Postgres is a docker instance:

Run: `docker compose -f docker-compose-external-postgres.dev.yml up`

Note: We have ran into situations where the node_modules aren’t being installed. You may need to run `npm i` inside of the root folder. Then run the docker compose command again.

## LMS INSTALLATION

Canvas
* https://community.canvaslms.com/docs/DOC-13117-415274482
  * Note: the URL to enter in these steps will be `https://<app hostname>/lti/config.xml`
