# Golang Project

## Setup

### Initialize a new Go module:

```sh
go mod init <module-name>
```

### Install dependencies:

```sh
go mod tidy
```

## Running Tests with Statement Coverage

```sh
cd <package-name>
```

### Run tests with coverage and generate a coverage report:

```sh
go test -cover -coverprofile="coverage.out"
```

### View the coverage details in the terminal:

```sh
go tool cover -func="coverage.out"
```

### Generate an HTML report for better visualization:

```sh
go tool cover -html="coverage.out" -o coverage.html
```

## Running Tests with Branch Coverage

```sh
cd <package-name>
```

### Installation

#### With go1.17 or later:

```sh
go install github.com/rillig/gobco@latest
```

#### With go1.16:

```sh
go get github.com/rillig/gobco
```

### Run tests with branch coverage

```sh
gobco
```

## Test Result

### Partial Coverage Test

#### Line Coverage

![image](https://github.com/user-attachments/assets/ef0f6aa0-4c01-4382-945d-74a932f8c1c0)

#### Branch Coverage

![image](https://github.com/user-attachments/assets/974f287e-0763-41bd-97a0-97cd99da309a)

### Full Coverage Test

#### Line Coverage

![image](https://github.com/user-attachments/assets/70c58612-bbb4-4e8c-98a0-d584868c6b07)

#### Branch Coverage

![image](https://github.com/user-attachments/assets/48b205b2-4e4b-445b-933e-84ea1dd435c8)

### Note: Leapyear branch

![image](https://github.com/user-attachments/assets/add4cb9a-9472-4d4e-b4e8-3a525fff32ef)
