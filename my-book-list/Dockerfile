FROM golang:latest as builder

WORKDIR /usr/src/app

COPY . .

RUN cd ./cmd/server && go build -v -o /usr/local/bin/ ./...

FROM scratch

COPY --from=builder /usr/local/bin/server /usr/local/bin/server

COPY go.mod go.sum ./
RUN go mod tidy && go mod download && go mod verify

ENTRYPOINT ["/usr/local/bin/server"]