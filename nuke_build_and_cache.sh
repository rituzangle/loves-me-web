rm -rf node_modules package-lock.json .expo .expo-shared ios Pods Podfile.lock
watchman watch-del-all
npm install
npx expo prebuild
cd ios && pod install && cd ..

# start again
npx expo run:ios

