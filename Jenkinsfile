pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'andresgnzlz333'
    BACKEND_IMAGE = "${DOCKERHUB_USER}/mern-backend"
    FRONTEND_IMAGE = "${DOCKERHUB_USER}/mern-frontend"
  }

  stages {
    stage('Clonar código') {
      steps {
        git 'https://github.com/8Andresz420/mern-app.git'
      }
    }

    stage('Construir backend') {
      steps {
        script {
          docker.build("${BACKEND_IMAGE}:latest", "./backend")
        }
      }
    }

    stage('Construir frontend') {
      steps {
        script {
          docker.build("${FRONTEND_IMAGE}:latest", "./frontend")
        }
      }
    }

    stage('Login en Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
          '''
        }
      }
    }

    stage('Push imágenes') {
      steps {
        script {
          docker.image("${BACKEND_IMAGE}:latest").push()
          docker.image("${FRONTEND_IMAGE}:latest").push()
        }
      }
    }
  }
}
