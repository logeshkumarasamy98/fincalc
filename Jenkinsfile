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
        sh '''SSH_KEY_PATH="/home/logesh/.ssh/id_rsa"
SERVER_USER="logesh"
SERVER_IP="127.0.0.1"

REMOTE_COMMANDS="
cd /home/logesh/test &&
ls
"

ssh -o StrictHostKeyChecking=no -i $SSH_KEY_PATH $SERVER_USER@$SERVER_IP "$REMOTE_COMMANDS"
'''
      }
    }

  }
}