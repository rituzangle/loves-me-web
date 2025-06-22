echo 'cd ios'
cd ios
pod deintegrate
rm -rf Pods Podfile.lock
pod install --repo-update

