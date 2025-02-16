package user

import (
	"encoding/json"
	"net/http"
)

// UserController handles user-related HTTP requests
type UserController struct {
	Service UserService
}

func NewUserController(service UserService) *UserController {
	return &UserController{Service: service}
}

func (uc *UserController) GetUser(w http.ResponseWriter, r *http.Request) {
	userId := r.URL.Query().Get("userId")
	if userId == "" {
		response := ResponseData{
			Status: ResponseStatus{Message: "userId is required", Code: http.StatusBadRequest},
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	user, err := uc.Service.GetUser(userId)
	if err != nil {
		response := ResponseData{
			Status: ResponseStatus{Message: "Internal Server Error", Code: http.StatusInternalServerError},
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	// Success response
	response := ResponseData{
		Status: ResponseStatus{Message: "Success", Code: http.StatusOK},
		Data: map[string]string{
			"name": user.Name,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
