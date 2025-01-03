pipeline {
    agent any

    environment {
        script {
            // Load environment variables from the .env file
            def envFile = readFile '.env'
            envFile.split('\n').each { line ->
                if (line.trim() && !line.startsWith('#')) {
                    def (key, value) = line.split('=')
                    environment[key.trim()] = value.trim()
                }
            }
        }
    }

    triggers {
        // Periodic trigger for checking updates every 15 minutes
        cron('H/15 * * * *')
    }

    stages {
        stage('Clone Repositories') {
            parallel {
                stage('Clone Frontend Repository') {
                    steps {
                        echo 'Cloning frontend repository...'
                        git branch: "${FRONTEND_BRANCH}", url: "${FRONTEND_REPO}"
                    }
                }
                stage('Clone Backend Repository') {
                    steps {
                        echo 'Cloning backend repository...'
                        git branch: "${BACKEND_BRANCH}", url: "${BACKEND_REPO}"
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        echo 'Building Docker image for frontend...'
                        script {
                            docker.build("${FRONTEND_IMAGE}:latest", './frontend')
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        echo 'Building Docker image for backend...'
                        script {
                            docker.build("${BACKEND_IMAGE}:latest", './backend')
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Frontend Image') {
                    steps {
                        echo 'Pushing frontend image to Docker Hub...'
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("${FRONTEND_IMAGE}:latest").push()
                            }
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        echo 'Pushing backend image to Docker Hub...'
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("${BACKEND_IMAGE}:latest").push()
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}