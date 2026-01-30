import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Image, StyleSheet, ScrollView,
  Alert, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const App = () => {
  const [craftsmen] = useState([
    {
      id: '1',
      name: 'أحمد النجار',
      profession: 'نجار',
      country: 'السعودية',
      state: 'الرياض',
      phone: '+966500000001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.5,
      reviewCount: 23,
      views: 156,
      calls: 42
    },
    {
      id: '2',
      name: 'محمد السباك',
      profession: 'سباك',
      country: 'مصر',
      state: 'القاهرة',
      phone: '+201000000002',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 4.2,
      reviewCount: 17,
      views: 89,
      calls: 31
    },
    {
      id: '3',
      name: 'خالد الكهربائي',
      profession: 'كهربائي',
      country: 'الإمارات',
      state: 'دبي',
      phone: '+971500000003',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 4.7,
      reviewCount: 31,
      views: 142,
      calls: 56
    }
  ]);

  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');

  const professions = ['كل المهن', 'نجار', 'سباك', 'كهربائي', 'بناء', 'دهان'];

  const toggleFavorite = (craftsmanId) => {
    if (favorites.includes(craftsmanId)) {
      setFavorites(favorites.filter(id => id !== craftsmanId));
    } else {
      setFavorites([...favorites, craftsmanId]);
    }
  };

  const handleCall = (phone, name) => {
    Alert.alert(
      'اتصال',
      `هل تريد الاتصال بـ ${name}؟\n${phone}`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'اتصال', onPress: () => Alert.alert('تم', 'سيتم الاتصال قريباً') }
      ]
    );
  };

  const renderCraftsman = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarSection}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <Icon name="verified" size={16} color="#4CAF50" />
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.professionRow}>
              <Text style={styles.professionIcon}>
                {item.profession === 'نجار' ? '🪚' : 
                 item.profession === 'سباك' ? '🔧' : 
                 item.profession === 'كهربائي' ? '⚡' : '🏗️'}
              </Text>
              <Text style={styles.profession}>{item.profession}</Text>
            </View>
            <View style={styles.locationRow}>
              <Icon name="location-on" size={14} color="#666" />
              <Text style={styles.location}>{item.state}، {item.country}</Text>
            </View>
          </View>

          <View style={styles.actionsSection}>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Icon
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? "#FF4081" : "#666"}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareBtn}>
              <Icon name="share" size={22} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="remove-red-eye" size={16} color="#666" />
            <Text style={styles.statText}>{item.views} مشاهدة</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="phone" size={16} color="#666" />
            <Text style={styles.statText}>{item.calls} اتصال</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{item.rating} ({item.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.serviceCard}>
          <Text style={styles.serviceTitle}>تصنيع أثاث مودرن</Text>
          <Text style={styles.serviceDescription}>أصنع أثاث خشبي عالي الجودة بتصاميم عصرية</Text>
          <Text style={styles.servicePrice}>السعر: 500 ريال</Text>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' }} 
            style={styles.serviceImage} 
          />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => handleCall(item.phone, item.name)}>
            <Icon name="phone" size={18} color="#FFF" />
            <Text style={styles.callButtonText}>اتصال</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rateButton}>
            <Icon name="star-rate" size={18} color="#4CAF50" />
            <Text style={styles.rateButtonText}>قيم</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>سوق الحرفيين</Text>
        <TouchableOpacity>
          <Icon name="person-add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن حرفي أو خدمة..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.professionScroll}>
          {professions.map((prof) => (
            <TouchableOpacity
              key={prof}
              style={[styles.filterPill, selectedProfession === prof && styles.filterPillActive]}
              onPress={() => setSelectedProfession(prof)}>
              <Text style={[styles.filterPillText, selectedProfession === prof && styles.filterPillTextActive]}>
                {prof}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={craftsmen}
        renderItem={renderCraftsman}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    padding: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  professionScroll: {
    marginBottom: 10,
  },
  filterPill: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterPillActive: {
    backgroundColor: '#4CAF50',
  },
  filterPillText: {
    color: '#666',
    fontSize: 14,
  },
  filterPillTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatarSection: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  infoSection: {
    flex: 1,
    marginHorizontal: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  professionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  professionIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  profession: {
    fontSize: 14,
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#888',
    marginLeft: 3,
  },
  actionsSection: {
    alignItems: 'center',
    gap: 10,
  },
  shareBtn: {
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  serviceCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    margin: 15,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  rateButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;