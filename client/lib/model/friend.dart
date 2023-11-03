import 'dart:convert';

import 'package:client/model/users.dart';

class Friend {
  final List<User> friends;

  Friend({required this.friends});

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'friends': friends.map((x) => x.toMap()).toList()});

    return result;
  }

  factory Friend.fromMap(Map<String, dynamic> map) {
    return Friend(
      friends: List<User>.from(map['friends']?.map((x) => User.fromMap(x))),
    );
  }

  String toJson() => json.encode(toMap());

  factory Friend.fromJson(String source) => Friend.fromMap(json.decode(source));
}
