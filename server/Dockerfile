FROM node:12

# Add package file
COPY package*.json ./

ENV PORT=5000
ENV DB_URL=mysql://user:123123@db:3306/etracker_db?charset=UTF8
ENV JWT_SECRET=super-secret-key
ENV EMAIL_ADDRESS=email@email.com
ENV EMAIL_PASSWORD=email_password
ENV FORGOT_PASSWORD_LINK=http://localhost:3000

# Install deps
RUN npm install

# Copy source
COPY . ./

# Build dist
RUN npm run build

# Expose port 5000
EXPOSE 5000

## Utility to wait for the DB
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run start