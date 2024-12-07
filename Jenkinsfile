pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        git(url: 'https://github.com/logeshkumarasamy98/fincalc.git', branch: 'main')
      }
    }

    stage('check') {
      steps {
        sh 'ls'
      }
    }

  }
}