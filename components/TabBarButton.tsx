import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/icon'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const TabBarButton = ({
  onPress,
  onLongPress,
  routerName,
  isFocused,
  color,
  label,
}: {
  onPress: Function
  onLongPress: Function
  routerName: string
  isFocused: boolean
  color: string
  label: string
}) => {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    })
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])

    const top = interpolate(scale.value, [0, 1], [0, 9])
    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return {
      opacity,
    }
  })

  return (
    <Pressable style={styles.tabbarItem} onPress={onPress} onLongPress={onLongPress}>
      <Animated.View style={animatedIconStyle}>
        {icon[routerName]({ color: isFocused ? '#fff' : '#222' })}
      </Animated.View>
      <Animated.Text
        style={[{ color: isFocused ? '#673ab7' : '#222', fontSize: 12 }, animatedTextStyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
})

export default TabBarButton
