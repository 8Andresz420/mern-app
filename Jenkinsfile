pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID de las credenciales en Jenkins
    DOCKERHUB_USERNAME = 'andresgnzlz333'
    BACKEND_IMAGE = 'andresgnzlz333/mern-backend'
    FRONTEND_IMAGE = 'andresgnzlz333/mern-frontend'
    APP_VERSION = 'latest'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/8Andresz420/mern-app.git', branch: 'main'
      }
    }

    stage('Docker Login') {
      steps {
        powershell """
          echo ${DOCKERHUB_CREDENTIALS} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
        """
      }
    }

    stage('Build & Push Backend') {
      steps {
        dir('backend') {
          powershell """
            docker build -t ${BACKEND_IMAGE}:${APP_VERSION} -f Dockerfile .
            docker push ${BACKEND_IMAGE}:${APP_VERSION}
          """
        }
      }
    }

    stage('Build & Push Frontend') {
      steps {
        dir('frontend') {
          powershell """
            docker build -t ${FRONTEND_IMAGE}:${APP_VERSION} -f Dockerfile .
            docker push ${FRONTEND_IMAGE}:${APP_VERSION}
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        powershell """
          kubectl apply -f k8s\\mongo-deployment.yaml
          kubectl apply -f k8s\\backend-deployment.yaml
          kubectl apply -f k8s\\backend-service.yaml
          kubectl apply -f k8s\\frontend-deployment.yaml
          kubectl apply -f k8s\\frontend-service.yaml
        """
      }
    }
  }

  post {
    success {
      echo '✅ Despliegue exitoso'
    }
    failure {
      echo '❌ La ejecución falló'
    }
  }
}
