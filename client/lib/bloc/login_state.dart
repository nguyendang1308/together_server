part of 'login_bloc.dart';

class LoginState extends Equatable {
  final User? user;
  const LoginState({required this.user});

  factory LoginState.initial() {
    return const LoginState(user: null);
  }

  @override
  List<Object?> get props => [user];

  LoginState copyWith({
    User? user,
  }) {
    return LoginState(
      user: user ?? this.user,
    );
  }
}
