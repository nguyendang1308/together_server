part of 'login_bloc.dart';

class LoginState extends Equatable {
  final User user;
  const LoginState({required this.user});

  factory LoginState.initial() {
    return LoginState(
        user: User(
      email: '',
      birthday: '',
      fullName: '',
      gender: '',
      id: '',
    ));
  }

  @override
  List<Object> get props => [user];

  LoginState copyWith({
    User? user,
  }) {
    return LoginState(
      user: user ?? this.user,
    );
  }
}
