package user

type ResponseStatus struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

type ResponseData struct {
	Status ResponseStatus `json:"status"`
	Data   interface{}    `json:"data,omitempty"`
}
