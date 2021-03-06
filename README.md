# AngularTestAssignment

This code automatically deploys with GitHub Actions to a [Firebase Project](https://angulartestassignment.firebaseapp.com):

name: CI

on:
  push:
    branches: 
      - master

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Install Dependencies
      run: |
        sudo npm i -g @angular/cli@8.3.22
        sudo npm i -g firebase-tools@7.11
    - name: Remove Old Files
      run: rm -rf firebase/public/*
    - name: Build
      run: |
        cd AngularTestAssignment
        npm install
        ng lint
        ng build --prod
        cd ..
    - name: Copy over
      run: cp -r ./AngularTestAssignment/dist/AngularTestAssignment/* ./firebase/public
    - name: Deploy
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_KEY }}
      run: |
        cd firebase
        sudo firebase deploy --token "$FIREBASE_TOKEN"
