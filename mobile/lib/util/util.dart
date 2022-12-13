import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:intl/intl.dart';
import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';

dynamic getIfExists(dynamic snapshot, String key, {or}) {
  try {
    return snapshot[key] ?? or;
  } catch (error) {
    return or;
  }
}

bool stringContains(String a, String search) {
  return a.toLowerCase().contains(search.toLowerCase());
}

String getTimestamp() {
  return DateTime.now().toIso8601String();
}

DateTime getStartOfDay(DateTime d) {
  return DateTime(d.year, d.month, d.day);
}

DateTime getStartOfNextDay(String ts) {
  final nextDay = DateTime.parse(ts).add(Duration(days: 1));
  return DateTime(nextDay.year, nextDay.month, nextDay.day);
}

DateTime getStartOfPreviousDay(DateTime d) {
  final previousDay = d.subtract(Duration(days: 1));
  return DateTime(previousDay.year, previousDay.month, previousDay.day);
}

DateTime removeTime(DateTime d) {
  return DateTime(d.year, d.month, d.day);
}

bool isMidnight(String ts) {
  return DateTime.parse(ts).hour == 0 && DateTime.parse(ts).minute == 0;
}

String getTimestamp24HoursFromNow() {
  return DateTime.now().add(Duration(hours: 24)).toIso8601String();
}

bool isBeforeNow(String ts) {
  return DateTime.parse(ts).difference(DateTime.now()) > Duration.zero;
}

String getOldTimestamp() {
  return DateTime(1980).toIso8601String();
}

String generateMd5(String input) {
  return md5.convert(utf8.encode(input)).toString();
}

String formatTimestamp(String ts, bool allDay) {
  if (allDay) {
    return DateFormat("MMMM d, yyyy").format(DateTime.parse(ts));
  } else {
    return DateFormat("MMMM d, yyyy @ hh:mm a").format(DateTime.parse(ts));
  }
}

int getDayDifference(DateTime a, DateTime b) {
  return a.difference(b).inDays;
}

int getWeekDifference(DateTime a, DateTime b) {
  return (getDayDifference(a, b) / 7).round();
}

String formatChatTimestamp(String ts) {
  final parsed = DateTime.parse(ts);
  final dayDiff = getDayDifference(DateTime.now(), parsed);
  if (DateTime.now().day == parsed.day) {
    return DateFormat("h:mm aa").format(parsed);
  } else if (DateTime.now().subtract(Duration(days: 1)).day == parsed.day) {
    return "yesterday";
  } else if (dayDiff < 7) {
    return DateFormat("EEEE").format(parsed).substring(0, 3);
  } else {
    final weekDiff = getWeekDifference(parsed, DateTime.now()).abs();
    return "${weekDiff}w";
  }
}

String capitalize(String word) {
  if (word.length > 1) {
    return "${word[0].toUpperCase()}${word.substring(1)}";
  } else {
    return word;
  }
}

String shorten(String s, int cutoff) {
  return s.length < cutoff ? s : s.substring(0, cutoff) + "...";
}

double getHeightOrScreenHeight(BuildContext context, double height) {
  return min(MediaQuery.of(context).size.height + 0.0, height);
}

Map<dynamic, int> getFreq(Iterable<dynamic> values) {
  Map<dynamic, int> freq = {};
  for (var x in values) {
    freq[x] = !freq.containsKey(x) ? (1) : (freq[x]! + 1);
  }
  return freq;
}

Map<dynamic, dynamic> convertTagGroupsToMap(List<List<dynamic>> tagGroups) {
  Map<dynamic, dynamic> tagData = {};
  tagGroups.asMap().forEach((index, group) => group.forEach((tag) => tagData[tag] = index));
  return tagData;
}

List<List<String>> convertMapToTagGroups(Map<dynamic, dynamic> tagMap) {
  var groups = tagMap.values.toSet().toList();
  groups.sort();
  return groups
      .map((idx) => List<String>.from(tagMap.keys.where((k) => tagMap[k] == idx)))
      .toList();
}

double iosAndroidNumber(double ios, double android) {
  return Platform.isIOS ? ios : android;
}
