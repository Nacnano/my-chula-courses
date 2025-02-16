package user

type UserService interface {
	GetUser(userId string) (User, error)
}

type UserServiceImpl struct{}

func (us *UserServiceImpl) GetUser(userId string) (User, error) {
	return User{ID: userId, Name: "John Doe"}, nil
}
