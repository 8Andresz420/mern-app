pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
    DOCKERHUB_USERNAME = 'andresgnzlz333'
    IMAGE_BACKEND = "andresgnzlz333/mern-backend"
    IMAGE_FRONTEND = "andresgnzlz333/mern-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/8Andresz420/mern-app.git', branch: 'main'
      }
    }

    stage('Build & Push Backend') {
      steps {
        dir('backend') {
          script {
            docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
              docker.build("${IMAGE_BACKEND}:latest", ".")
                    .push()
            }
          }
        }
      }
    }

    stage('Build & Push Frontend') {
      steps {
        dir('frontend') {
          script {
            docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
              docker.build("${IMAGE_FRONTEND}:latest", ".")
                    .push()
            }
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/backend-deployment.yaml'
        sh 'kubectl apply -f k8s/frontend-deployment.yaml'
        sh 'kubectl apply -f k8s/backend-service.yaml'
        sh 'kubectl apply -f k8s/frontend-service.yaml'
        sh 'kubectl apply -f k8s/mongo-deployment.yaml'
      }
    }
  }

  post {
    failure {
      echo 'La ejecución falló'
    }
    success {
      echo 'Despliegue exitoso'
    }
  }
}