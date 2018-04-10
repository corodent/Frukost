yarn build
cd build
aws s3 cp . s3://rct-frukost/ --recursive
# http://rct-frukost.s3-website.eu-central-1.amazonaws.com/
