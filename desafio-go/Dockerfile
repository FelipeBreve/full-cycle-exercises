FROM golang as builder
WORKDIR /app
COPY src/ /app
RUN go build -ldflags "-s -w" -o hello hello.go

FROM busybox:1.29-uclibc
WORKDIR /app
COPY --from=builder /app/hello /app
ENTRYPOINT [ "./hello" ]