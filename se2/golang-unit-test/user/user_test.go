package user

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockUserService struct {
	mock.Mock
}

// Implement GetUser
func (m *MockUserService) GetUser(userID string) (User, error) {
	args := m.Called(userID)
	return args.Get(0).(User), args.Error(1)
}

func TestGetUser_ExpectedSuccess(t *testing.T) {
	mockService := new(MockUserService)

	expectedUser := User{ID: "123", Name: "John Doe"}

	// Set up the mock service to return the expected user when GetUser is called with "123"
	mockService.On("GetUser", "123").Return(expectedUser, nil)

	req, _ := http.NewRequest("GET", "/user?userId=123", nil)

	// Create a recorder to capture the HTTP response
	rr := httptest.NewRecorder()

	// Call the GetUser handler function from the UserController with the mock service
	NewUserController(mockService).GetUser(rr, req)

	// Assert that the response status code is HTTP 200 OK
	assert.Equal(t, http.StatusOK, rr.Code)

	expectedResponse := map[string]interface{}{
		"status": map[string]interface{}{
			"message": "Success",
			"code":    float64(http.StatusOK),
		},
		"data": map[string]interface{}{
			"name": "John Doe",
		},
	}

	// Decode the actual response body into a map to compare with the expected response
	var actualResponse map[string]interface{}
	err := json.NewDecoder(rr.Body).Decode(&actualResponse)

	// Assert that there was no error during the JSON decoding process
	assert.NoError(t, err)

	// Assert that the actual response structure matches the expected response structure
	assert.Equal(t, expectedResponse, actualResponse)

	// Verify that the mock service's expectations were met (i.e., GetUser was called with "123")
	mockService.AssertExpectations(t)
}

func TestGetUser_ExpectedBadRequest(t *testing.T) {
	mockService := new(MockUserService)

	req, _ := http.NewRequest("GET", "/user?userId=", nil)

	// Create a recorder to capture the HTTP response
	rr := httptest.NewRecorder()

	// Call the GetUser handler function from the UserController with the mock service
	NewUserController(mockService).GetUser(rr, req)

	// Assert that the response status code is HTTP 200 OK
	assert.Equal(t, http.StatusBadRequest, rr.Code)

	expectedResponse := map[string]interface{}{
		"status": map[string]interface{}{
			"message": "userId is required",
			"code":    float64(http.StatusBadRequest),
		},
	}

	// Decode the actual response body into a map to compare with the expected response
	var actualResponse map[string]interface{}
	err := json.NewDecoder(rr.Body).Decode(&actualResponse)

	// Assert that there was no error during the JSON decoding process
	assert.NoError(t, err)

	// Assert that the actual response structure matches the expected response structure
	assert.Equal(t, expectedResponse, actualResponse)

	// Verify that GetUser was not called at all
	mockService.AssertNotCalled(t, "GetUser")
}

func TestGetUser_ExpectedInternalServerError(t *testing.T) {
	mockService := new(MockUserService)

	mockService.On("GetUser", "123").Return(User{}, assert.AnError)

	req, _ := http.NewRequest("GET", "/user?userId=123", nil)
	rr := httptest.NewRecorder()

	NewUserController(mockService).GetUser(rr, req)

	assert.Equal(t, http.StatusInternalServerError, rr.Code)

	expectedResponse := map[string]interface{}{
		"status": map[string]interface{}{
			"message": "Internal Server Error",
			"code":    float64(http.StatusInternalServerError),
		},
	}

	var actualResponse map[string]interface{}
	err := json.NewDecoder(rr.Body).Decode(&actualResponse)
	assert.NoError(t, err)

	assert.Equal(t, expectedResponse, actualResponse)

	mockService.AssertExpectations(t)
}
