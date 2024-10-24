def directory = "/home/deploy/asabik_dev/asabik-frontend"

pipeline {
    agent { 
        label "asabik"
    }
    stages {
        stage('pull development branch') {
            steps {
                dir("${directory}") {
                    sh "git clean -ffdx"
                    git url: 'git@github.com:Marotino-INC/asabik-frontend.git', branch: 'development'
                    sh "git log --oneline -n 5"
                }
            }
        }
        stage('copy env files') {
            steps {
                dir("${directory}") {
                    sh "cp ../env/frontend/proxy.conf.js ."
                }
            }
        }
        stage('install and build') {
            steps {
                dir("${directory}") {
                    sh "npm install"
                }
            }
        }
        stage('deploy') {
            steps {
                dir("${directory}") {
                    sh "pm2 del asabik-frontend-dev"
                    sh "pm2 start npm --name \"asabik-frontend-dev\" -- start -- --port=3006 --host=127.0.0.1"
                }
            }
        }
    }
}
