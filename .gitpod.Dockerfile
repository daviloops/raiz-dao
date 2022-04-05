FROM gitpod/workspace-full

RUN bash -c ". .nvm/nvm.sh \
             && nvm install v16 && nvm alias default v16 \
             && nvm use default && npm i -g yarn"